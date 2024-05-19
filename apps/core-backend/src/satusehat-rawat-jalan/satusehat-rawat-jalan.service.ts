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
    await this.ensureDoctorSatuSehatId(mrid);

    this.satusehatJsonService.clearUsedUUIDs();

    const encounterBody = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [await this.satusehatJsonService.encounterJson(mrid)],
    };

    const encounterResponse = await firstValueFrom(
      this.httpService.post('', encounterBody).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          this.logger.error(JSON.stringify(error.response.data, null, 2));
          throw new SatuSehatErrorException(error.response.status);
        }),
      ),
    );

    await this.prismaService.patient_medical_records.update({
      where: {
        id: mrid,
      },
      data: {
        encounterId: encounterResponse.data.entry[0].response.resourceID,
      },
    });

    const afterEncounterBody = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        ...(await this.observationHttpBodyList(mrid)),
        await this.satusehatJsonService.conditionJson(mrid),
        await this.satusehatJsonService.procedureJson(mrid),
      ],
    };

    const afterEncounterResponse = await firstValueFrom(
      this.httpService.post('', afterEncounterBody).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          this.logger.error(JSON.stringify(error.response.data, null, 2));
          throw new SatuSehatErrorException(error.response.status);
        }),
      ),
    );

    // return [
    //   ...encounterResponse.data.entry,
    //   ...afterEncounterResponse.data.entry,
    // ];

    return { encounterBody, afterEncounterBody };
  }

  async observationHttpBodyList(mrid: string) {
    const valuesList = [
      {
        key: 'pulse',
        code: '8867-4',
        display: 'Heart rate',
        valueUnit: 'beats/minute',
        valueCode: '/min',
      },
      {
        key: 'respiration',
        code: '9279-1',
        display: 'Respiratory rate',
        valueUnit: 'breaths/minute',
        valueCode: '/min',
      },
      {
        key: 'systole',
        code: '8480-6',
        display: 'Systolic blood pressure',
        valueUnit: 'mm[Hg]',
        valueCode: 'mm[Hg]',
      },
      {
        key: 'diastole',
        code: '8462-4',
        display: 'Diastolic blood pressure',
        valueUnit: 'mm[Hg]',
        valueCode: 'mm[Hg]',
      },
      {
        key: 'temperature',
        code: '8310-5',
        display: 'Body temperature',
        valueUnit: 'C',
        valueCode: 'Cel',
      },
    ];

    const transformedValues = valuesList.map(async (value) => {
      return await this.satusehatJsonService.observationJson(mrid, value);
    });

    return Promise.all(transformedValues);
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
            this.logger.error(JSON.stringify(error.response.data, null, 2));
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
              this.logger.error(JSON.stringify(error.response.data, null, 2));
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
              this.logger.error(JSON.stringify(error.response.data, null, 2));
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

  async ensureDoctorSatuSehatId(mrid: string) {
    const patientAssessment =
      await this.prismaService.patient_assessment.findFirst({
        where: {
          patient_medical_recordsId: mrid,
        },
        select: {
          Doctor: {
            select: {
              id: true,
              nik: true,
              satuSehatId: true,
            },
          },
        },
      });

    if (!patientAssessment.Doctor.satuSehatId) {
      const queryParams = {
        identifier: `https://fhir.kemkes.go.id/id/nik|${patientAssessment.Doctor.nik}`,
      };

      const { data } = await firstValueFrom(
        this.httpService.get('Practitioner', { params: queryParams }).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            this.logger.error(JSON.stringify(error.response.data, null, 2));
            throw new SatuSehatErrorException(error.response.status);
          }),
        ),
      );

      await this.prismaService.users.update({
        where: {
          id: patientAssessment.Doctor.id,
        },
        data: {
          satuSehatId: data.entry[0].resource.id,
        },
      });
    }
  }
}
