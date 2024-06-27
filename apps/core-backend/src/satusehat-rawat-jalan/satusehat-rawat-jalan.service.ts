import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Prisma, Role } from '@prisma/client';
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

  clinicReqJsonArray = [];
  clinicResJsonArray = [];

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
        users: {
          some: {
            roles: Role.OWNER,
            nik: {
              not: 'Belum ada NIK',
            },
          },
        },
      },
    });

    const satusehatResponseBodyJsonArray = [];

    for (const clinic of clinics) {
      await this.postSatuSehatForClinic(clinic.id);
      satusehatResponseBodyJsonArray.push({
        clinic,
        clinicRequestBody: this.clinicReqJsonArray,
        clinicResponseBody: this.clinicResJsonArray,
      });
    }

    return satusehatResponseBodyJsonArray;
  }

  async postSatuSehatForClinic(clinicsId: string) {
    this.clinicReqJsonArray = [];
    this.clinicResJsonArray = [];

    const medicalRecords =
      await this.prismaService.patient_medical_records.findMany({
        where: {
          Patient: {
            clinicsId,
          },
          encounterId: null,
        },
        select: {
          id: true,
        },
      });

    const mridList = medicalRecords.map((mr) => {
      return { mrid: mr.id };
    });

    for (const { mrid } of mridList) {
      await this.ensurePatientSatuSehatId(mrid);
      await this.ensurePractitionerSatuSehatId(mrid);
      await this.ensureDoctorSatuSehatId(clinicsId, mrid);
      await this.ensurePharmacySatuSehatId(clinicsId, mrid);
    }

    await this.ensureNewEncounterSatuSehatId(clinicsId);
    await this.ensureSoapSatuSehatId(clinicsId);

    await this.ensureMedicationsSatuSehatId(clinicsId);
    await this.ensureMedicationRequestSatuSehatId(clinicsId);
    await this.ensureMedicationDispenseSatuSehatId(clinicsId);

    await this.ensureCompletedEncounterSatuSehatId(clinicsId);
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

    this.clinicReqJsonArray.push(requestBody);
    this.clinicResJsonArray.push(...responseBody.data.entry);

    return responseBody.data.entry;
  }

  async observationHttpBodyList(mrid: string) {
    const valuesList = [
      {
        key: 'height',
        code: '8302-2',
        display: 'Body height',
        valueUnit: 'cm',
        valueCode: 'cm',
      },
      {
        key: 'weight',
        code: '29463-7',
        display: 'Body weight',
        valueUnit: 'kg',
        valueCode: 'kg',
      },
      {
        key: 'pulse',
        code: '8867-4',
        display: 'Heart rate',
        valueUnit: '{beats}/min',
        valueCode: '{beats}/min',
      },
      {
        key: 'respiration',
        code: '9279-1',
        display: 'Respiratory rate',
        valueUnit: '{breaths}/min',
        valueCode: '{breaths}/min',
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
        valueUnit: 'Cel',
        valueCode: 'Cel',
      },
      {
        key: 'sugar',
        code: '2345-7',
        display: 'Glucose [Mass/volume] in Serum or Plasma',
        valueUnit: 'mg/dL',
        valueCode: 'mg/dL',
      },
      {
        key: 'cholesterol',
        code: '2093-3',
        display: 'Cholesterol [Mass/volume] in Serum or Plasma',
        valueUnit: 'mg/dL',
        valueCode: 'mg/dL',
      },
      {
        key: 'urate',
        code: '3084-1',
        display: 'Urate [Mass/volume] in Serum or Plasma',
        valueUnit: 'mg/dL',
        valueCode: 'mg/dL',
      },
    ];

    const transformedValues = valuesList.map(async (value) => {
      return await this.satusehatJsonService.observationJson(mrid, value);
    });

    const result = await Promise.all(transformedValues);
    return result.filter((value) => value !== false);
  }

  onlyContainsZeros(str: string): boolean {
    return str.split('').every((char) => char === '0');
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

    if (
      !patientMR.Patient.nik ||
      this.onlyContainsZeros(patientMR.Patient.nik)
    ) {
      return;
    }

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

    if (!patientAssessment) {
      return;
    }

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
        status: 'Done',
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

  async ensureNewEncounterSatuSehatId(clinicsId: string) {
    const medicalRecords =
      await this.prismaService.patient_medical_records.findMany({
        where: {
          Patient: {
            satuSehatId: {
              not: null,
            },
            clinicsId,
          },
          encounterId: null,
          assessment: {
            some: {
              icd10Code: {
                not: null,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });

    const mridList = medicalRecords.map((mr) => {
      return { mrid: mr.id };
    });

    const newEncounterJsonArray = [];

    for (const { mrid } of mridList) {
      newEncounterJsonArray.push(
        await this.satusehatJsonService.newEncounterJson(mrid),
      );
    }

    for (const { mrid } of mridList) {
      newEncounterJsonArray.push(...(await this.observationHttpBodyList(mrid)));
    }

    const newEncounterResponseBody = await this.postBundle(
      clinicsId,
      newEncounterJsonArray,
    );

    for (const [index, { mrid }] of mridList.entries()) {
      await this.prismaService.patient_medical_records.update({
        where: {
          id: mrid,
        },
        data: {
          encounterId: newEncounterResponseBody[index].response.resourceID,
        },
      });
    }
  }

  async ensureSoapSatuSehatId(clinicsId: string) {
    const patientAssessments =
      await this.prismaService.patient_assessment.findMany({
        where: {
          syncedWithSatuSehat: false,
          Patient_medical_records: {
            encounterId: {
              not: null,
            },
          },
        },
        select: {
          patient_medical_recordsId: true,
        },
      });

    const soapJsonArray = [];
    const conditionIndexes = [];
    const procedureIndexes = [];

    for (const { patient_medical_recordsId } of patientAssessments) {
      const mrid = patient_medical_recordsId;
      const patientAssessment =
        await this.prismaService.patient_assessment.findFirst({
          where: {
            patient_medical_recordsId: mrid,
          },
        });

      soapJsonArray.push(
        await this.satusehatJsonService.conditionJson(
          patientAssessment.conditionId ? 'PUT' : 'POST',
          mrid,
        ),
      );
      conditionIndexes.push(soapJsonArray.length - 1);

      let procedureMethod = null;
      if (patientAssessment.icd9CMCode) {
        if (patientAssessment.procedureId) {
          procedureMethod = 'PUT';
        } else {
          procedureMethod = 'POST';
        }
      } else if (patientAssessment.procedureId) {
        procedureMethod = 'DELETE';
      }

      if (procedureMethod) {
        soapJsonArray.push(
          await this.satusehatJsonService.procedureJson(procedureMethod, mrid),
        );
      }

      procedureIndexes.push(procedureMethod ? soapJsonArray.length - 1 : null);
    }

    const soapResponseBody = await this.postBundle(clinicsId, soapJsonArray);

    for (const [
      index,
      { patient_medical_recordsId },
    ] of patientAssessments.entries()) {
      await this.prismaService.patient_assessment.updateMany({
        where: {
          patient_medical_recordsId,
        },
        data: {
          conditionId:
            soapResponseBody[conditionIndexes[index]].response.resourceID,
          ...(procedureIndexes[index] && {
            procedureId:
              soapResponseBody[procedureIndexes[index]].response.resourceID,
          }),
          ...(!procedureIndexes[index] && {
            procedureId: null,
          }),
          syncedWithSatuSehat: true,
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
        satuSehatId: {
          not: null,
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

  async ensureMedicationRequestSatuSehatId(clinicsId: string) {
    const args: Prisma.Patient_prescriptionFindManyArgs['where'] = {
      Patient_medical_records: {
        Patient: {
          clinicsId,
        },
        assessment: {
          some: {
            conditionId: {
              not: null,
            },
          },
        },
      },
      syncedWithSatuSehat: false,
      Medicine: {
        satuSehatId: {
          not: null,
        },
      },
    };

    const newPatPres = await this.prismaService.patient_prescription.findMany({
      where: {
        ...args,
        satuSehatId: null,
      },
    });

    const updPatPres = await this.prismaService.patient_prescription.findMany({
      where: {
        ...args,
        satuSehatId: {
          not: null,
        },
      },
    });

    const allPatPres = [
      ...newPatPres.map((prescription) => {
        return { method: 'POST', id: prescription.id };
      }),
      ...updPatPres.map((prescription) => {
        return { method: 'PUT', id: prescription.id };
      }),
    ];

    const patPresResponseBody = await this.postBundle(
      clinicsId,
      await Promise.all(
        allPatPres.map(async (value) => {
          return await this.satusehatJsonService.medicationRequestJson(
            value.method,
            clinicsId,
            value.id,
          );
        }),
      ),
    );

    for (const [index, value] of patPresResponseBody.entries()) {
      await this.prismaService.patient_prescription.update({
        where: {
          id: allPatPres[index].id,
        },
        data: {
          satuSehatId: value.response.resourceID,
          syncedWithSatuSehat: true,
        },
      });
    }
  }

  async ensureMedicationDispenseSatuSehatId(clinicsId: string) {
    const args: Prisma.Medication_dispenseFindManyArgs['where'] = {
      clinicsId,
      syncedWithSatuSehat: false,
      patient_prescription: {
        satuSehatId: {
          not: null,
        },
      },
    };

    const newMedDispenses =
      await this.prismaService.medication_dispense.findMany({
        where: {
          ...args,
          satuSehatId: null,
        },
      });

    const updMedDispenses =
      await this.prismaService.medication_dispense.findMany({
        where: {
          ...args,
          satuSehatId: {
            not: null,
          },
        },
      });

    const allMedDispenses = [
      ...newMedDispenses.map((medDispense) => {
        return { method: 'POST', id: medDispense.id };
      }),
      ...updMedDispenses.map((medDispense) => {
        return { method: 'PUT', id: medDispense.id };
      }),
    ];

    const medDispenseResponseBody = await this.postBundle(
      clinicsId,
      await Promise.all(
        allMedDispenses.map(async (value) => {
          return await this.satusehatJsonService.medicationDispenseJson(
            value.method,
            clinicsId,
            value.id,
          );
        }),
      ),
    );

    for (const [index, value] of medDispenseResponseBody.entries()) {
      await this.prismaService.medication_dispense.update({
        where: {
          id: allMedDispenses[index].id,
        },
        data: {
          satuSehatId: value.response.resourceID,
          syncedWithSatuSehat: true,
        },
      });
    }
  }

  async ensureCompletedEncounterSatuSehatId(clinicsId: string) {
    const medicalRecords =
      await this.prismaService.patient_medical_records.findMany({
        where: {
          Patient: {
            clinicsId,
          },
          encounterId: {
            not: null,
          },
          assessment: {
            some: {
              conditionId: {
                not: null,
              },
            },
          },
          satuSehatCompleted: false,
        },
        select: {
          id: true,
        },
      });

    const mridList = [];
    for (const mr of medicalRecords) {
      const medicalRecord =
        await this.prismaService.patient_medical_records.findFirst({
          where: {
            id: mr.id,
          },
          select: {
            status: true,
            prescription: true,
          },
        });

      let isCompleted = false;
      if (medicalRecord.prescription.length === 0) {
        isCompleted = true;
      } else {
        const pharmacyTask = await this.prismaService.pharmacy_Task.findFirst({
          where: {
            assessmentReffId: mr.id,
          },
        });

        if (pharmacyTask.status === 'Done') {
          isCompleted = true;
        }
      }

      if (isCompleted) {
        mridList.push(mr.id);
      }
    }

    const completedEncounterJsonArray = [];

    for (const mrid of mridList) {
      completedEncounterJsonArray.push(
        await this.satusehatJsonService.completedEncounterJson(mrid),
      );
    }

    await this.postBundle(clinicsId, completedEncounterJsonArray);

    for (const mrid of mridList) {
      await this.prismaService.patient_medical_records.update({
        where: {
          id: mrid,
        },
        data: {
          satuSehatCompleted: true,
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
