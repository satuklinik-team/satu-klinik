import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncounterJsonDto } from './dto/encounter-json';
import { Cache } from 'cache-manager';
import { time } from 'console';

@Injectable()
export class SatusehatJsonService {
  constructor(private readonly prismaService: PrismaService) {}

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
      fullUrl: 'urn:uuid:7bc68ccf-22b9-464a-ba8d-f99a14a33171',
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
}
