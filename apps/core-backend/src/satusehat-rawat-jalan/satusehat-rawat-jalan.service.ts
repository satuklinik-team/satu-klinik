import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { SatuSehatErrorException } from 'src/exceptions/bad-request/satusehat-error-exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatJsonService } from 'src/satusehat-json/satusehat-json.service';
import { SatusehatOauthService } from 'src/satusehat-oauth/satusehat-oauth.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SatusehatRawatJalanService {
  private logger: Logger = new Logger(SatusehatRawatJalanService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private httpService: HttpService,
    private readonly satusehatOauthService: SatusehatOauthService,
    private readonly satusehatJsonService: SatusehatJsonService,
  ) {}

  async post(mrid: string) {
    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
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

    await this.ensurePatientSatuSehatId(mrid);
    await this.ensurePractitionerSatuSehatId(mrid);
    await this.ensureDoctorSatuSehatId(patientMR.Patient.clinicsId, mrid);
    await this.ensurePharmacySatuSehatId(patientMR.Patient.clinicsId, mrid);

    const encounter = await this.postBundle(patientMR.Patient.clinicsId, [
      await this.satusehatJsonService.encounterJson(mrid),
    ]);

    await this.prismaService.patient_medical_records.update({
      where: {
        id: mrid,
      },
      data: {
        encounterId: encounter.responseBody[0].response.resourceID,
      },
    });

    const observationConditionProcedure = await this.postBundle(
      patientMR.Patient.clinicsId,
      [
        ...(await this.observationHttpBodyList(mrid)),
        await this.satusehatJsonService.conditionJson(mrid),
        await this.satusehatJsonService.procedureJson(mrid),
      ],
    );

    await this.prismaService.patient_assessment.updateMany({
      where: {
        patient_medical_recordsId: mrid,
      },
      data: {
        conditionId:
          observationConditionProcedure.responseBody[5].response.resourceID,
      },
    });

    await this.ensureMedicationsSatuSehatId(patientMR.Patient.clinicsId);

    const medicationRequestBundle = await this.medicationRequestBundle(
      patientMR.Patient.clinicsId,
      mrid,
    );

    const medicationRequest = await this.postBundle(
      patientMR.Patient.clinicsId,
      medicationRequestBundle.map((value: any) => value.requestBody),
    );

    for (const [index, value] of medicationRequest.responseBody.entries()) {
      await this.prismaService.patient_prescription.update({
        where: {
          id: medicationRequestBundle[index].id,
        },
        data: {
          satuSehatId: value.response.resourceID,
        },
      });
    }

    const medicationDispenseBundle = await this.medicationDispenseBundle(
      patientMR.Patient.clinicsId,
      mrid,
    );

    const medicationDispense = await this.postBundle(
      patientMR.Patient.clinicsId,
      medicationDispenseBundle.map((value: any) => value.requestBody),
    );

    return {
      encounter,
      observationConditionProcedure,
      medicationRequest,
      medicationDispense,
    };
  }

  async postBundle(clinicsId: string, entry: any[]) {
    const token = await this.satusehatOauthService.token(clinicsId);

    const uuidSet = new Set<string>();

    while (uuidSet.size < entry.length) {
      uuidSet.add(uuidv4());
    }

    const uuidArray = Array.from(uuidSet);

    const requestBody = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: entry.map((value, index) => {
        return {
          fullUrl: `urn:uuid:${uuidArray[index]}`,
          ...value,
        };
      }),
    };

    const responseBody = await firstValueFrom(
      this.httpService
        .post('', requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            this.logger.error(JSON.stringify(error.response.data, null, 2));
            throw new SatuSehatErrorException(error.response.status);
          }),
        ),
    );

    return {
      requestBody,
      responseBody: responseBody.data.entry,
    };
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

    return await Promise.all(transformedValues);
  }

  async medicationRequestBundle(clinicsId: string, mrid: string) {
    const prescriptions =
      await this.prismaService.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: mrid,
        },
      });

    const transformedValues = prescriptions.map(async (value) => {
      return {
        id: value.id,
        requestBody: await this.satusehatJsonService.medicationRequestJson(
          clinicsId,
          value.id,
        ),
      };
    });

    return await Promise.all(transformedValues);
  }

  async medicationDispenseBundle(clinicsId: string, mrid: string) {
    const prescriptions =
      await this.prismaService.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: mrid,
          bought: true,
        },
      });

    const transformedValues = prescriptions.map(async (value) => {
      return {
        id: value.id,
        requestBody: await this.satusehatJsonService.medicationDispenseJson(
          clinicsId,
          value.id,
        ),
      };
    });

    return await Promise.all(transformedValues);
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

      const token = await this.satusehatOauthService.token(
        patientMR.Patient.clinicsId,
      );

      const { data } = await firstValueFrom(
        this.httpService
          .get('Patient', {
            params: queryParams,
            headers: { Authorization: `Bearer ${token}` },
          })
          .pipe(
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
          this.httpService
            .post('Patient', body, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .pipe(
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

        const token = await this.satusehatOauthService.token(
          patientMR.Patient.clinicsId,
        );

        const { data } = await firstValueFrom(
          this.httpService
            .get('Practitioner', {
              params: queryParams,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .pipe(
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

  async ensureDoctorSatuSehatId(clinicsId: string, mrid: string) {
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

      const token = await this.satusehatOauthService.token(clinicsId);

      const { data } = await firstValueFrom(
        this.httpService
          .get('Practitioner', {
            params: queryParams,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .pipe(
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

  async ensurePharmacySatuSehatId(clinicsId: string, mrid: string) {
    const pharmacyTask = await this.prismaService.pharmacy_Task.findFirst({
      where: {
        assessmentReffId: mrid,
      },
      select: {
        pharmacist: true,
      },
    });

    const pharmacist = await this.prismaService.users.findFirst({
      where: {
        id: pharmacyTask.pharmacist,
      },
    });

    if (!pharmacist.satuSehatId) {
      const queryParams = {
        identifier: `https://fhir.kemkes.go.id/id/nik|${pharmacist.nik}`,
      };

      const token = await this.satusehatOauthService.token(clinicsId);

      const { data } = await firstValueFrom(
        this.httpService
          .get('Practitioner', {
            params: queryParams,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.message);
              this.logger.error(JSON.stringify(error.response.data, null, 2));
              throw new SatuSehatErrorException(error.response.status);
            }),
          ),
      );

      await this.prismaService.users.update({
        where: {
          id: pharmacist.id,
        },
        data: {
          satuSehatId: data.entry[0].resource.id,
        },
      });
    }
  }

  async ensureMedicationsSatuSehatId(clinicsId: string) {
    const medicines = await this.prismaService.medicine.findMany({
      where: {
        category: {
          clinicsId,
        },
        satuSehatId: null,
        kfaCode: {
          not: null,
        },
      },
    });

    const medications = await this.postBundle(
      clinicsId,
      await Promise.all(
        medicines.map(
          async (medicine) =>
            await this.satusehatJsonService.medicationJson(
              clinicsId,
              medicine.id,
            ),
        ),
      ),
    );

    for (const [index, value] of medicines.entries()) {
      await this.prismaService.medicine.update({
        where: {
          id: value.id,
        },
        data: {
          satuSehatId: medications.responseBody[index].response.resourceID,
        },
      });
    }
  }
}
