import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncounterJsonDto } from './dto/encounter-json';
import { Cache } from 'cache-manager';
import { time } from 'console';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SatusehatJsonService {
  private usedUUIDs: Set<string> = new Set<string>();

  constructor(private readonly prismaService: PrismaService) {}

  getUUID(): string {
    let newUUID: string;
    do {
      newUUID = uuidv4();
    } while (this.usedUUIDs.has(newUUID));

    this.usedUUIDs.add(newUUID);
    return newUUID;
  }

  clearUsedUUIDs(): void {
    this.usedUUIDs.clear();
  }

  async registerPatientJson(patientId: string) {
    const patient = await this.prismaService.patient.findFirst({
      where: {
        id: patientId,
      },
    });
    return {
      resourceType: 'Patient',
      meta: {
        profile: ['https://fhir.kemkes.go.id/r4/StructureDefinition/Patient'],
      },
      identifier: [
        {
          use: 'official',
          system: 'https://fhir.kemkes.go.id/id/nik',
          value: patient.nik,
        },
      ],
      active: true,
      name: [
        {
          use: 'official',
          text: patient.fullname,
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: patient.phone,
          use: 'mobile',
        },
      ],
      gender: patient.sex == 'L' ? 'male' : 'female',
      birthDate: patient.birthAt.toISOString().split('T')[0],
      deceasedBoolean: false,
      address: [
        {
          use: 'home',
          line: [patient.address],
          country: 'ID',
        },
      ],
      multipleBirthInteger: 0,
      communication: [
        {
          language: {
            coding: [
              {
                system: 'urn:ietf:bcp:47',
                code: 'id-ID',
                display: 'Indonesian',
              },
            ],
            text: 'Indonesian',
          },
          preferred: true,
        },
      ],
      extension: [
        {
          url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus',
          valueCode: 'WNI',
        },
      ],
    };
  }

  async encounterJson(mrid: string) {
    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
        where: {
          id: mrid,
        },
        select: {
          queue: true,
          visitAt: true,
          Patient: {
            select: {
              satuSehatId: true,
              fullname: true,
              Clinics: {
                select: {
                  organizationId: true,
                  locationSatuSehatId: true,
                  locationName: true,
                },
              },
            },
          },
          Practitioner: {
            select: {
              satuSehatId: true,
              fullname: true,
            },
          },
        },
      });

    const pharmacyTask = await this.prismaService.pharmacy_Task.findFirst({
      where: {
        assessmentReffId: mrid,
      },
    });

    return {
      fullUrl: `urn:uuid:${this.getUUID()}`,
      resource: {
        resourceType: 'Encounter',
        identifier: [
          {
            system: `http://sys-ids.kemkes.go.id/encounter/${patientMR.Patient.Clinics.organizationId}`,
            value: patientMR.queue,
          },
        ],
        status: 'finished',
        statusHistory: [
          {
            status: 'arrived',
            period: {
              start: patientMR.visitAt,
              end: patientMR.visitAt,
            },
          },
          {
            status: 'in-progress',
            period: {
              start: patientMR.visitAt,
              end: pharmacyTask.doneAt,
            },
          },
          {
            status: 'finished',
            period: {
              start: pharmacyTask.doneAt,
              end: pharmacyTask.doneAt,
            },
          },
        ],
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
          display: 'ambulatory',
        },
        subject: {
          reference: `Patient/${patientMR.Patient.satuSehatId}`,
          display: patientMR.Patient.fullname,
        },
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    system:
                      'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
                    code: 'ATND',
                    display: 'attender',
                  },
                ],
              },
            ],
            individual: {
              reference: `Practitioner/${patientMR.Practitioner.satuSehatId}`,
              display: patientMR.Practitioner.fullname,
            },
          },
        ],
        period: {
          start: patientMR.visitAt,
          end: pharmacyTask.doneAt,
        },
        location: [
          {
            location: {
              reference: `Location/${patientMR.Patient.Clinics.locationSatuSehatId}`,
              display: patientMR.Patient.Clinics.locationName,
            },
            period: {
              start: patientMR.visitAt,
            },
          },
        ],
        serviceProvider: {
          reference: `Organization/${patientMR.Patient.Clinics.organizationId}`,
        },
      },
      request: {
        method: 'POST',
        url: 'Encounter',
      },
    };
  }

  async observationJson(mrid: string, value: any) {
    const patientVitalSign =
      await this.prismaService.patient_vital_sign.findFirst({
        where: {
          patient_medical_recordsId: mrid,
        },
        select: {
          pulse: true,
          respiration: true,
          systole: true,
          diastole: true,
          temperature: true,
          Patient_medical_records: {
            select: {
              Patient: {
                select: {
                  fullname: true,
                  satuSehatId: true,
                },
              },
              encounterId: true,
              visitAt: true,
              Practitioner: {
                select: {
                  fullname: true,
                  satuSehatId: true,
                },
              },
            },
          },
        },
      });

    return {
      fullUrl: `urn:uuid:${this.getUUID()}`,
      resource: {
        resourceType: 'Observation',
        status: 'final',
        category: [
          {
            coding: [
              {
                system:
                  'http://terminology.hl7.org/CodeSystem/observation-category',
                code: 'vital-signs',
                display: 'Vital Signs',
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: value.code,
              display: value.display,
            },
          ],
        },
        subject: {
          reference: `Patient/${patientVitalSign.Patient_medical_records.Patient.satuSehatId}`,
          display: patientVitalSign.Patient_medical_records.Patient.fullname,
        },
        encounter: {
          reference: `Encounter/${patientVitalSign.Patient_medical_records.encounterId}`,
        },
        effectiveDateTime: patientVitalSign.Patient_medical_records.visitAt,
        issued: patientVitalSign.Patient_medical_records.visitAt,
        performer: [
          {
            reference: `Practitioner/${patientVitalSign.Patient_medical_records.Practitioner.satuSehatId}`,
            display:
              patientVitalSign.Patient_medical_records.Practitioner.fullname,
          },
        ],
        valueQuantity: {
          value: patientVitalSign[value.key],
          unit: value.valueUnit,
          system: 'http://unitsofmeasure.org',
          code: value.valueCode,
        },
      },
      request: {
        method: 'POST',
        url: 'Observation',
      },
    };
  }

  async conditionJson(mrid: string) {
    const patientAssessment =
      await this.prismaService.patient_assessment.findFirst({
        where: {
          patient_medical_recordsId: mrid,
        },
        select: {
          icd10: {
            select: {
              code: true,
              strt: true,
            },
          },
          Patient_medical_records: {
            select: {
              encounterId: true,
              Patient: {
                select: {
                  fullname: true,
                  satuSehatId: true,
                },
              },
            },
          },
          createdAt: true,
          Doctor: {
            select: {
              fullname: true,
              satuSehatId: true,
            },
          },
        },
      });

    return {
      fullUrl: `urn:uuid:${this.getUUID()}`,
      resource: {
        resourceType: 'Condition',
        clinicalStatus: {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'active',
              display: 'Active',
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://terminology.hl7.org/CodeSystem/condition-category',
                code: 'encounter-diagnosis',
                display: 'Encounter Diagnosis',
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: 'http://hl7.org/fhir/sid/icd-10',
              code: patientAssessment.icd10.code,
              display: patientAssessment.icd10.strt,
            },
          ],
        },
        subject: {
          reference: `Patient/${patientAssessment.Patient_medical_records.Patient.satuSehatId}`,
          display: patientAssessment.Patient_medical_records.Patient.fullname,
        },
        encounter: {
          reference: `Encounter/${patientAssessment.Patient_medical_records.encounterId}`,
        },
        recordedDate: patientAssessment.createdAt,
        recorder: {
          reference: `Practitioner/${patientAssessment.Doctor.satuSehatId}`,
          display: patientAssessment.Doctor.fullname,
        },
      },
      request: {
        method: 'POST',
        url: 'Condition',
      },
    };
  }

  async procedureJson(mrid: string) {
    const patientAssessment =
      await this.prismaService.patient_assessment.findFirst({
        where: {
          patient_medical_recordsId: mrid,
        },
        select: {
          icd9CM: {
            select: {
              code: true,
              str: true,
            },
          },
          Patient_medical_records: {
            select: {
              Patient: {
                select: {
                  satuSehatId: true,
                  fullname: true,
                },
              },
              encounterId: true,
            },
          },
          Doctor: {
            select: {
              satuSehatId: true,
              fullname: true,
            },
          },
          createdAt: true,
        },
      });

    return {
      fullUrl: `urn:uuid:${this.getUUID()}`,
      resource: {
        resourceType: 'Procedure',
        status: 'completed',
        category: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '103693007',
              display: 'Diagnostic procedure',
            },
          ],
          text: 'Prosedur Diagnostik',
        },
        code: {
          coding: [
            {
              system: 'http://hl7.org/fhir/sid/icd-9-cm',
              code: patientAssessment.icd9CM.code,
              display: patientAssessment.icd9CM.str,
            },
          ],
        },
        subject: {
          reference: `Patient/${patientAssessment.Patient_medical_records.Patient.satuSehatId}`,
          display: patientAssessment.Patient_medical_records.Patient.fullname,
        },
        encounter: {
          reference: `Encounter/${patientAssessment.Patient_medical_records.encounterId}`,
        },
        performedPeriod: {
          start: patientAssessment.createdAt,
          end: patientAssessment.createdAt,
        },
        performer: [
          {
            actor: {
              reference: `Practitioner/${patientAssessment.Doctor.satuSehatId}`,
              display: patientAssessment.Doctor.fullname,
            },
          },
        ],
      },
      request: {
        method: 'POST',
        url: 'Procedure',
      },
    };
  }
}
