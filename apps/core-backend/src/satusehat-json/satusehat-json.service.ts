import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncounterJsonDto } from './dto/encounter-json';
import { Cache } from 'cache-manager';
import { time } from 'console';
import { v4 as uuidv4 } from 'uuid';
import { SatusehatKfaService } from 'src/satusehat-kfa/satusehat-kfa.service';

@Injectable()
export class SatusehatJsonService {
  private usedUUIDs: Set<string> = new Set<string>();

  constructor(
    private readonly prismaService: PrismaService,
    private readonly satusehatKfaService: SatusehatKfaService,
  ) {}

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
            extension: [
              {
                extension: [
                  {
                    url: 'value',
                    valueCodeableConcept: {
                      coding: [
                        {
                          system:
                            'http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient',
                          code: 'reguler',
                          display: 'Kelas Reguler',
                        },
                      ],
                    },
                  },
                ],
                url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass',
              },
            ],
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

  async medicationJson(clinicsId: string, medicineId: number) {
    const clinics = await this.prismaService.clinics.findFirst({
      where: {
        id: clinicsId,
      },
      select: {
        organizationId: true,
      },
    });

    const medicine = await this.prismaService.medicine.findFirst({
      where: {
        id: medicineId,
      },
      select: {
        id: true,
        kfaCode: true,
      },
    });

    const kfaInfo = await this.satusehatKfaService.getKfaDetail(
      clinicsId,
      medicine.kfaCode,
    );

    return {
      fullUrl: `urn:uuid:${this.getUUID()}`,
      resource: {
        resourceType: 'Medication',
        meta: {
          profile: [
            'https://fhir.kemkes.go.id/r4/StructureDefinition/Medication',
          ],
        },
        identifier: [
          {
            system: `http://sys-ids.kemkes.go.id/medication/${clinics.organizationId}`,
            use: 'official',
            value: medicine.id.toString(),
          },
        ],
        code: {
          coding: [
            {
              system: 'http://sys-ids.kemkes.go.id/kfa',
              code: medicine.kfaCode,
              display: kfaInfo.result.name,
            },
          ],
        },
        status: 'active',
        form: {
          coding: [
            {
              system:
                'http://terminology.kemkes.go.id/CodeSystem/medication-form',
              code: kfaInfo.result.dosage_form.code,
              display: kfaInfo.result.dosage_form.name,
            },
          ],
        },
        ingredient: kfaInfo.result.active_ingredients.map(
          (ingredient: any) => ({
            itemCodeableConcept: {
              coding: [
                {
                  system: 'http://sys-ids.kemkes.go.id/kfa',
                  code: ingredient.kfa_code,
                  display: ingredient.zat_aktif,
                },
              ],
            },
            isActive: true,
            strength: {
              numerator: {
                value: parseInt(ingredient.kekuatan_zat_aktif[0]),
                system: 'http://unitsofmeasure.org',
                code: ingredient.kekuatan_zat_aktif[1].split('/')[0],
              },
              denominator: {
                value: 1,
                system:
                  'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
                code: 'TAB',
              },
            },
          }),
        ),
        extension: [
          {
            url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType',
            valueCodeableConcept: {
              coding: [
                {
                  system:
                    'http://terminology.kemkes.go.id/CodeSystem/medication-type',
                  code: 'NC',
                  display: 'Non-compound',
                },
              ],
            },
          },
        ],
      },
      request: {
        method: 'POST',
        url: 'Medication',
      },
    };
  }

  async medicationRequestJson(clinicsId: string, prescriptionId: number) {
    const clinics = await this.prismaService.clinics.findFirst({
      where: {
        id: clinicsId,
      },
      select: {
        organizationId: true,
      },
    });

    const prescription =
      await this.prismaService.patient_prescription.findFirst({
        where: {
          id: prescriptionId,
        },
        select: {
          id: true,
          frequency: true,
          period: true,
          createdAt: true,
          notes: true,
          doseQuantity: true,
          totalQuantity: true,
          supplyDuration: true,
          Medicine: {
            select: {
              id: true,
              satuSehatId: true,
              title: true,
            },
          },
          Patient_medical_records: {
            select: {
              encounterId: true,
              assessment: {
                take: 1,
                select: {
                  Doctor: {
                    select: {
                      fullname: true,
                      satuSehatId: true,
                    },
                  },
                  id: true,
                  conditionId: true,
                },
              },
              Patient: {
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
        resourceType: 'MedicationRequest',
        identifier: [
          {
            use: 'official',
            system: `http://sys-ids.kemkes.go.id/prescription/${clinics.organizationId}`,
            value: prescription,
          },
          {
            use: 'official',
            system: 'http://sys-ids.kemkes.go.id/prescription-item/{{Org_id}}',
            value: prescription.Patient_medical_records.assessment[0].id,
          },
        ],
        status: 'completed',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system:
                  'http://terminology.hl7.org/CodeSystem/medicationrequest-category',
                code: 'outpatient',
                display: 'Outpatient',
              },
            ],
          },
        ],
        priority: 'routine',
        medicationReference: {
          reference: `Medication/${prescription.Medicine.satuSehatId}`,
          display: prescription.Medicine.title,
        },
        subject: {
          reference: `Patient/${prescription.Patient_medical_records.Patient.satuSehatId}`,
          display: prescription.Patient_medical_records.Patient.fullname,
        },
        encounter: {
          reference: `Encounter/${prescription.Patient_medical_records.encounterId}`,
        },
        authoredOn: prescription.createdAt,
        requester: {
          reference: `Practitioner/${prescription.Patient_medical_records.assessment[0].Doctor.satuSehatId}`,
          display:
            prescription.Patient_medical_records.assessment[0].Doctor.fullname,
        },
        reasonReference: [
          {
            reference: `Condition/${prescription.Patient_medical_records.assessment[0].conditionId}`,
            display: `Condition on ${prescription.Patient_medical_records.Patient.fullname} at ${prescription.createdAt}`,
          },
        ],
        dosageInstruction: [
          {
            sequence: 1,
            patientInstruction: prescription.notes,
            timing: {
              repeat: {
                frequency: prescription.frequency,
                period: prescription.period,
                periodUnit: 'd',
              },
            },
            route: {
              coding: [
                {
                  system: 'http://www.whocc.no/atc',
                  code: 'O',
                  display: 'Oral',
                },
              ],
            },
            doseAndRate: [
              {
                type: {
                  coding: [
                    {
                      system:
                        'http://terminology.hl7.org/CodeSystem/dose-rate-type',
                      code: 'ordered',
                      display: 'Ordered',
                    },
                  ],
                },
                doseQuantity: {
                  value: prescription.doseQuantity,
                  unit: 'TAB',
                  system:
                    'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
                  code: 'TAB',
                },
              },
            ],
          },
        ],
        dispenseRequest: {
          dispenseInterval: {
            value: 1,
            unit: 'days',
            system: 'http://unitsofmeasure.org',
            code: 'd',
          },
          numberOfRepeatsAllowed: 0,
          quantity: {
            value: prescription.totalQuantity,
            unit: 'TAB',
            system:
              'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
            code: 'TAB',
          },
          expectedSupplyDuration: {
            value: prescription.supplyDuration,
            unit: 'days',
            system: 'http://unitsofmeasure.org',
            code: 'd',
          },
          performer: {
            reference: `Organization/${clinics.organizationId}`,
          },
        },
      },
      request: {
        method: 'POST',
        url: 'MedicationRequest',
      },
    };
  }

  async medicationDispenseJson() {
    return {
      fullUrl: 'urn:uuid:c208648c-9f2f-4437-b4b4-7a8a2ddcf19f',
      resource: {
        resourceType: 'MedicationDispense',
        identifier: [
          {
            use: 'official',
            system: 'http://sys-ids.kemkes.go.id/prescription/{{Org_id}}',
            value: '123456788',
          },
          {
            use: 'official',
            system: 'http://sys-ids.kemkes.go.id/prescription-item/{{Org_id}}',
            value: '123456788-1',
          },
        ],
        status: 'completed',
        category: {
          coding: [
            {
              system:
                'http://terminology.hl7.org/fhir/CodeSystem/medicationdispense-category',
              code: 'outpatient',
              display: 'Outpatient',
            },
          ],
        },
        medicationReference: {
          reference: 'Medication/{{Medication_ForDispense}}',
          display: '{{Medication_Name}}',
        },
        subject: {
          reference: 'Patient/{{Patient_Id}}',
          display: '{{Patient_Name}}',
        },
        context: {
          reference: 'Encounter/{{Encounter_uuid}}',
        },
        performer: [
          {
            actor: {
              reference: 'Practitioner/N10000003',
              display: 'Apoteker Miller',
            },
          },
        ],
        location: {
          reference: 'Location/{{Location_farmasi_uuid}}',
          display: '{{Location_farmasi_Name}}',
        },
        authorizingPrescription: [
          {
            reference: 'MedicationRequest/{{MedicationRequest_uuid}}',
          },
        ],
        quantity: {
          value: 120,
          system: 'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
          code: 'TAB',
        },
        daysSupply: {
          value: 30,
          unit: 'Day',
          system: 'http://unitsofmeasure.org',
          code: 'd',
        },
        whenPrepared: '2023-08-31T03:27:00+00:00',
        whenHandedOver: '2023-08-31T03:27:00+00:00',
        dosageInstruction: [
          {
            sequence: 1,
            patientInstruction:
              '4 tablet perhari, diminum setiap hari tanpa jeda sampai prose pengobatan berakhir',
            timing: {
              repeat: {
                frequency: 1,
                period: 1,
                periodUnit: 'd',
              },
            },
            doseAndRate: [
              {
                type: {
                  coding: [
                    {
                      system:
                        'http://terminology.hl7.org/CodeSystem/dose-rate-type',
                      code: 'ordered',
                      display: 'Ordered',
                    },
                  ],
                },
                doseQuantity: {
                  value: 4,
                  unit: 'TAB',
                  system:
                    'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
                  code: 'TAB',
                },
              },
            ],
          },
        ],
      },
      request: {
        method: 'POST',
        url: 'MedicationDispense',
      },
    };
  }
}
