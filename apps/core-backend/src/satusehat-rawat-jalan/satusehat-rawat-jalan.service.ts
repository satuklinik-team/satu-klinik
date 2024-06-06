import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const clinics = await this.prismaService.clinics.findMany({
      where: {
        clientId: {
          not: null,
        },
        clientSecret: {
          not: null,
        },
        organizationId: {
          not: null,
        },
        locationSatuSehatId: {
          not: null,
        },
        locationName: {
          not: null,
        },
      },
    });

    const satusehatResponseBodyJsonArray = [];

    for (const clinic of clinics) {
      satusehatResponseBodyJsonArray.push({
        clinic,
        clinicResponseBody: await this.postSatuSehatForClinic(clinic.id),
      });
    }

    return satusehatResponseBodyJsonArray;
  }

  async postSatuSehatForClinic(clinicsId: string) {
    const medicalRecords =
      await this.prismaService.patient_medical_records.findMany({
        where: {
          encounterId: null,
        },
        select: {
          id: true,
        },
      });

    const completedMedicalRecords = await Promise.all(
      medicalRecords.filter(async (mr) => {
        const medicalRecord =
          await this.prismaService.patient_medical_records.findFirst({
            where: {
              id: mr.id,
            },
            select: {
              prescription: true,
            },
          });

        if (medicalRecord.prescription.length === 0) {
          return true;
        }

        const pharmacyTask = await this.prismaService.pharmacy_Task.findFirst({
          where: {
            assessmentReffId: mr.id,
          },
        });

        if (pharmacyTask.status === 'Done') {
          return true;
        }

        return false;
      }),
    );

    const mridList = completedMedicalRecords.map((mr) => {
      return { mrid: mr.id };
    });

    const encounterKunjunganBaruJsonArray = [];

    for (const { mrid } of mridList) {
      await this.ensurePatientSatuSehatId(mrid);
      await this.ensurePractitionerSatuSehatId(mrid);
      await this.ensureDoctorSatuSehatId(clinicsId, mrid);
      await this.ensurePharmacySatuSehatId(clinicsId, mrid);

      encounterKunjunganBaruJsonArray.push(
        await this.satusehatJsonService.encounterKunjunganBaruJson(mrid),
      );
    }

    const encounterKunjunganBaruResponseBody = await this.postBundle(
      clinicsId,
      encounterKunjunganBaruJsonArray,
    );

    for (const [index, { mrid }] of mridList.entries()) {
      await this.prismaService.patient_medical_records.update({
        where: {
          id: mrid,
        },
        data: {
          encounterId:
            encounterKunjunganBaruResponseBody[index].response.resourceID,
        },
      });
    }

    const ocpJsonArray = [];
    const conditionIndexes = [];
    const procedureIndexes = [];

    for (const { mrid } of mridList) {
      const mridJson = [
        ...(await this.observationHttpBodyList(mrid)),
        await this.satusehatJsonService.conditionJson('POST', mrid),
      ];

      ocpJsonArray.push(...mridJson);
      conditionIndexes.push(ocpJsonArray.length - 1);

      const patientAssessment =
        await this.prismaService.patient_assessment.findFirst({
          where: {
            patient_medical_recordsId: mrid,
          },
          select: {
            icd9CMCode: true,
          },
        });

      if (patientAssessment.icd9CMCode) {
        ocpJsonArray.push(
          await this.satusehatJsonService.procedureJson('POST', mrid),
        );
        procedureIndexes.push(ocpJsonArray.length - 1);
      } else {
        procedureIndexes.push(null);
      }
    }

    const ocpResponseBody = await this.postBundle(clinicsId, ocpJsonArray);

    for (const [index, { mrid }] of mridList.entries()) {
      await this.prismaService.patient_assessment.updateMany({
        where: {
          patient_medical_recordsId: mrid,
        },
        data: {
          conditionId:
            ocpResponseBody[conditionIndexes[index]].response.resourceID,
          ...(procedureIndexes[index] && {
            procedureId:
              ocpResponseBody[procedureIndexes[index]].response.resourceID,
          }),
          syncedWithSatuSehat: true,
        },
      });
    }

    const syncCPJsonArray = [];
    const syncCIndexes = [];
    const syncPIndexes = [];

    const syncCPAssessment =
      await this.prismaService.patient_assessment.findMany({
        where: {
          syncedWithSatuSehat: false,
        },
        select: {
          id: true,
          patient_medical_recordsId: true,
          icd9CM: true,
          procedureId: true,
        },
      });

    for (const {
      id,
      patient_medical_recordsId,
      icd9CM,
      procedureId,
    } of syncCPAssessment) {
      const mrid = patient_medical_recordsId;
      syncCPJsonArray.push(
        await this.satusehatJsonService.conditionJson('PUT', mrid),
      );
      syncCIndexes.push(syncCPJsonArray.length - 1);

      if (icd9CM) {
        if (procedureId) {
          syncCPJsonArray.push(
            await this.satusehatJsonService.procedureJson('PUT', mrid),
          );
          syncPIndexes.push(syncCPJsonArray.length - 1);
        } else {
          syncCPJsonArray.push(
            await this.satusehatJsonService.procedureJson('POST', mrid),
          );
          syncPIndexes.push(syncCPJsonArray.length - 1);
        }
      } else {
        if (procedureId) {
          syncCPJsonArray.push(
            await this.satusehatJsonService.procedureJson('DELETE', mrid),
          );
          await this.prismaService.patient_assessment.update({
            where: {
              id,
            },
            data: {
              procedureId: null,
            },
          });
        }
        syncPIndexes.push(null);
      }
    }

    const syncCPResponseBody = await this.postBundle(
      clinicsId,
      syncCPJsonArray,
    );

    for (const [index, { id, icd9CM }] of syncCPAssessment.entries()) {
      const conditionId =
        syncCPResponseBody[syncCIndexes[index]].response.resourceID;

      let procedureId: string;
      if (icd9CM) {
        procedureId =
          syncCPResponseBody[syncPIndexes[index]].response.resourceID;
      }

      await this.prismaService.patient_assessment.update({
        where: {
          id,
        },
        data: {
          conditionId,
          procedureId,
        },
      });
    }

    await this.ensureMedicationsSatuSehatId(clinicsId);

    const medicationRequestJsonArray = [];

    for (const { mrid } of mridList) {
      const medicationRequestJson = await this.medicationRequestBundle(
        clinicsId,
        mrid,
      );

      medicationRequestJsonArray.push(...medicationRequestJson);
    }

    const medicationRequestResponseBody = await this.postBundle(
      clinicsId,
      medicationRequestJsonArray.map((value: any) => value.requestBody),
    );

    for (const [index, value] of medicationRequestResponseBody.entries()) {
      await this.prismaService.patient_prescription.update({
        where: {
          id: medicationRequestJsonArray[index].id,
        },
        data: {
          satuSehatId: value.response.resourceID,
        },
      });
    }

    const mdEcJsonArray = [];

    for (const { mrid } of mridList) {
      const medicationDispenseJson = await this.medicationDispenseBundle(
        clinicsId,
        mrid,
      );

      mdEcJsonArray.push(...medicationDispenseJson);

      mdEcJsonArray.push(
        await this.satusehatJsonService.encounterCompleteJson(mrid),
      );
    }

    const mdEcResponseBody = await this.postBundle(clinicsId, mdEcJsonArray);

    return {
      encounterKunjunganBaruResponseBody,
      ocpResponseBody,
      syncCPResponseBody,
      medicationRequestResponseBody,
      mdEcResponseBody,
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
          catchError(async (error: AxiosError) => {
            await this.showSatuSehatError(requestBody, error);
            throw new SatuSehatErrorException(error.response.status);
          }),
        ),
    );

    return responseBody.data.entry;
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
          Medicine: {
            kfaCode: {
              not: null,
            },
          },
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
          Medicine: {
            kfaCode: {
              not: null,
            },
          },
          bought: true,
        },
      });

    const transformedValues = prescriptions.map(async (value) => {
      return await this.satusehatJsonService.medicationDispenseJson(
        clinicsId,
        value.id,
      );
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
            catchError(async (error: AxiosError) => {
              await this.showSatuSehatError(queryParams, error);
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
              catchError(async (error: AxiosError) => {
                await this.showSatuSehatError(body, error);
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
              catchError(async (error: AxiosError) => {
                await this.showSatuSehatError(queryParams, error);
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
            catchError(async (error: AxiosError) => {
              await this.showSatuSehatError(queryParams, error);
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

    if (!pharmacyTask) {
      return;
    }

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
            catchError(async (error: AxiosError) => {
              await this.showSatuSehatError(queryParams, error);
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
    const newMedicines = await this.prismaService.medicine.findMany({
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

    const updateMedicines = await this.prismaService.medicine.findMany({
      where: {
        category: {
          clinicsId,
        },
        syncedWithSatuSehat: false,
      },
    });

    const allMedicines = [
      ...newMedicines.map((medicine) => {
        return { method: 'POST', id: medicine.id };
      }),
      ...updateMedicines.map((medicine) => {
        return { method: 'PUT', id: medicine.id };
      }),
    ];

    const medications = await this.postBundle(
      clinicsId,
      await Promise.all(
        allMedicines.map(
          async (medicine) =>
            await this.satusehatJsonService.medicationJson(
              medicine.method,
              clinicsId,
              medicine.id,
            ),
        ),
      ),
    );

    for (const [index, value] of allMedicines.entries()) {
      await this.prismaService.medicine.update({
        where: {
          id: value.id,
        },
        data: {
          satuSehatId: medications[index].response.resourceID,
          syncedWithSatuSehat: true,
        },
      });
    }
  }

  async showSatuSehatError(requestBody: any, error: AxiosError) {
    this.logger.error(error.message);
    await this.prismaService.satuSehatError.create({
      data: {
        url: error.request._redirectable._currentUrl,
        requestBody: JSON.stringify(requestBody),
        responseBody: JSON.stringify(error.response.data),
      },
    });
  }
}
