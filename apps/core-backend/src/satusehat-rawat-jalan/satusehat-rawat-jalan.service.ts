import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { SatuSehatErrorException } from 'src/exceptions/bad-request/satusehat-error-exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatJsonService } from 'src/satusehat-json/satusehat-json.service';
import { SatusehatOauthService } from 'src/satusehat-oauth/satusehat-oauth.service';

@Injectable()
export class SatusehatRawatJalanService {
  private logger: Logger = new Logger(SatusehatRawatJalanService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private httpService: HttpService,
    private readonly satusehatOauthService: SatusehatOauthService,
    private readonly satusehatJsonService: SatusehatJsonService,
  ) {}

  async ensureAuthenticated(clinicsId: string) {
    const token = await this.satusehatOauthService.token(clinicsId);
    this.httpService.axiosRef.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async post(mrid: string) {
    const clinics = await this.prismaService.patient_medical_records.findFirst({
      where: {
        id: mrid,
      },
      select: {
        Patient: {
          select: {
            clinicsId: true,
          },
        },
      },
    });

    await this.ensureAuthenticated(clinics.Patient.clinicsId);
    await this.ensurePatientSatuSehatId(mrid);
    await this.ensurePractitionerSatuSehatId(mrid);

    const encounterBody = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [await this.satusehatJsonService.encounterJson(mrid)],
    };

    const { data } = await firstValueFrom(
      this.httpService.post('', encounterBody).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new SatuSehatErrorException(error.response.status);
        }),
      ),
    );

    await this.prismaService.patient_medical_records.update({
      where: {
        id: mrid,
      },
      data: {
        encounterId: data.entry[0].response.resourceID,
      },
    });

    return data;
  }

  async ensurePatientSatuSehatId(mrid: string) {
    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
        where: {
          id: mrid,
        },
        select: {
          Patient: {
            select: {
              id: true,
              satuSehatId: true,
              nik: true,
              clinicsId: true,
            },
          },
        },
      });

    if (!patientMR.Patient.satuSehatId) {
      const queryParams = {
        identifier: `https://fhir.kemkes.go.id/id/nik|${patientMR.Patient.nik}`,
      };

      const { data } = await firstValueFrom(
        this.httpService.get('Patient', { params: queryParams }).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw new SatuSehatErrorException(error.response.status);
          }),
        ),
      );

      let patientSatuSehatId: any;
      if (data.total > 0) {
        patientSatuSehatId = data.entry[0].resource.id;
      } else {
        const body = await this.satusehatJsonService.registerPatientJson(
          patientMR.Patient.id,
        );

        const { data } = await firstValueFrom(
          this.httpService.post('Patient', body).pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.message);
              throw new SatuSehatErrorException(error.response.status);
            }),
          ),
        );
        patientSatuSehatId = data.data.patient_id;
      }

      await this.prismaService.patient.update({
        where: {
          id: patientMR.Patient.id,
        },
        data: {
          satuSehatId: patientSatuSehatId,
        },
      });
    }
  }

  async ensurePractitionerSatuSehatId(mrid: string) {
    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
        where: {
          id: mrid,
        },
        select: {
          Practitioner: {
            select: {
              id: true,
              satuSehatId: true,
              nik: true,
            },
          },
          Patient: {
            select: {
              clinicsId: true,
            },
          },
        },
      });

    if (!patientMR.Practitioner.satuSehatId) {
      const nikList = await this.prismaService.users.findMany({
        where: {
          clinicsId: patientMR.Patient.clinicsId,
          roles: Role.ADMIN,
        },
        select: {
          nik: true,
        },
      });

      nikList.unshift({ nik: patientMR.Practitioner.nik });

      for (const { nik } of nikList) {
        const queryParams = {
          identifier: `https://fhir.kemkes.go.id/id/nik|${nik}`,
        };

        const { data } = await firstValueFrom(
          this.httpService.get('Practitioner', { params: queryParams }).pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.message);
              throw new SatuSehatErrorException(error.response.status);
            }),
          ),
        );

        if (data.total > 0) {
          await this.prismaService.users.update({
            where: {
              id: patientMR.Practitioner.id,
            },
            data: {
              satuSehatId: data.entry[0].resource.id,
            },
          });

          break;
        }
      }
    }
  }
}
