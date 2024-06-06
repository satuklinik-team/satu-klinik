import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatKfaService } from 'src/satusehat-kfa/satusehat-kfa.service';

@Injectable()
export class SatusehatJsonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly satusehatKfaService: SatusehatKfaService,
  ) {}

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

  async encounterKunjunganBaruJson(mrid: string) {
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

    return {
      resource: {
        resourceType: 'Encounter',
        identifier: [
          {
            system: `http://sys-ids.kemkes.go.id/encounter/${patientMR.Patient.Clinics.organizationId}`,
            value: patientMR.queue,
          },
        ],
        status: 'arrived',
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
          },
        ],
        statusHistory: [
          {
            status: 'arrived',
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

  async conditionJson(method: string, mrid: string) {
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
          conditionId: true,
        },
      });

    return {
      resource: {
        resourceType: 'Condition',
        ...(method === 'PUT' && { id: patientAssessment.conditionId }),
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
        method,
        url:
          method === 'PUT'
            ? `Condition/${patientAssessment.conditionId}`
            : 'Condition',
      },
    };
  }

  async procedureJson(method: string, mrid: string) {
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
          procedureId: true,
        },
      });

    return {
      resource: {
        resourceType: 'Procedure',
        ...(method === 'PUT' && { id: patientAssessment.procedureId }),
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
        method,
        url:
          method === 'PUT'
            ? `Procedure/${patientAssessment.procedureId}`
            : 'Procedure',
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
                value: parseInt(
                  ingredient.kekuatan_zat_aktif.split('/')[0].split(' ')[0],
                ),
                system: 'http://unitsofmeasure.org',
                code: ingredient.kekuatan_zat_aktif.split('/')[0].split(' ')[1],
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
      resource: {
        resourceType: 'MedicationRequest',
        identifier: [
          {
            use: 'official',
            system: `http://sys-ids.kemkes.go.id/prescription/${clinics.organizationId}`,
            value: prescription.id.toString(),
          },
          {
            use: 'official',
            system: `http://sys-ids.kemkes.go.id/prescription-item/${clinics.organizationId}`,
            value:
              prescription.Patient_medical_records.assessment[0].id.toString(),
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

  async medicationDispenseJson(clinicsId: string, prescriptionId: number) {
    const clinics = await this.prismaService.clinics.findFirst({
      where: {
        id: clinicsId,
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
          satuSehatId: true,
          Medicine: {
            select: {
              id: true,
              satuSehatId: true,
              title: true,
            },
          },
          Patient_medical_records: {
            select: {
              id: true,
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

    const pharmacyTask = await this.prismaService.pharmacy_Task.findFirst({
      where: {
        assessmentReffId: prescription.Patient_medical_records.id,
      },
    });

    const pharmacist = await this.prismaService.users.findFirst({
      where: {
        id: pharmacyTask.pharmacist,
      },
    });

    return {
      resource: {
        resourceType: 'MedicationDispense',
        identifier: [
          {
            use: 'official',
            system: `http://sys-ids.kemkes.go.id/prescription/${clinics.organizationId}`,
            value: prescription.id.toString(),
          },
          {
            use: 'official',
            system: `http://sys-ids.kemkes.go.id/prescription-item/${clinics.organizationId}`,
            value:
              prescription.Patient_medical_records.assessment[0].id.toString(),
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
          reference: `Medication/${prescription.Medicine.satuSehatId}`,
          display: prescription.Medicine.title,
        },
        subject: {
          reference: `Patient/${prescription.Patient_medical_records.Patient.satuSehatId}`,
          display: prescription.Patient_medical_records.Patient.fullname,
        },
        context: {
          reference: `Encounter/${prescription.Patient_medical_records.encounterId}`,
        },
        performer: [
          {
            actor: {
              reference: `Practitioner/${pharmacist.satuSehatId}`,
              display: pharmacist.fullname,
            },
          },
        ],
        location: {
          reference: `Location/${clinics.locationSatuSehatId}`,
          display: clinics.locationName,
        },
        authorizingPrescription: [
          {
            reference: `MedicationRequest/${prescription.satuSehatId}`,
          },
        ],
        quantity: {
          value: prescription.totalQuantity,
          system: 'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
          code: 'TAB',
        },
        daysSupply: {
          value: prescription.supplyDuration,
          unit: 'Day',
          system: 'http://unitsofmeasure.org',
          code: 'd',
        },
        whenPrepared: pharmacyTask.doneAt,
        whenHandedOver: pharmacyTask.doneAt,
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
      },
      request: {
        method: 'POST',
        url: 'MedicationDispense',
      },
    };
  }

  async encounterCompleteJson(mrid: string) {
    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
        where: {
          id: mrid,
        },
        select: {
          encounterId: true,
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
          assessment: {
            take: 1,
          },
        },
      });

    const pharmacyTask = await this.prismaService.pharmacy_Task.findFirst({
      where: {
        assessmentReffId: mrid,
      },
    });

    let doneAt: Date;
    if (pharmacyTask) {
      doneAt = pharmacyTask.doneAt;
    } else {
      const patientAssessment =
        await this.prismaService.patient_assessment.findFirst({
          where: {
            patient_medical_recordsId: mrid,
          },
        });

      doneAt = patientAssessment.createdAt;
    }

    return {
      resource: {
        resourceType: 'Encounter',
        id: patientMR.encounterId,
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
              end: doneAt,
            },
          },
          {
            status: 'finished',
            period: {
              start: doneAt,
              end: doneAt,
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
          end: doneAt,
        },
        diagnosis: [
          {
            condition: {
              reference: `Condition/${patientMR.assessment[0].conditionId}`,
              display: `Condition on ${patientMR.Patient.fullname} at ${patientMR.assessment[0].createdAt}`,
            },
            use: {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/diagnosis-role',
                  code: 'DD',
                  display: 'Discharge diagnosis',
                },
              ],
            },
            rank: 1,
          },
        ],
        hospitalization: {
          dischargeDisposition: {
            coding: [
              {
                system:
                  'http://terminology.hl7.org/CodeSystem/discharge-disposition',
                code: 'home',
                display: 'Home',
              },
            ],
          },
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
        method: 'PUT',
        url: `Encounter/${patientMR.encounterId}`,
      },
    };
  }
}
