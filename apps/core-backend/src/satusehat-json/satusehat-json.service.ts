import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncounterJsonDto } from './dto/encounter-json';
import { Cache } from 'cache-manager';
import { time } from 'console';

@Injectable()
export class SatusehatJsonService {
  constructor(private readonly prismaService: PrismaService) {}

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
