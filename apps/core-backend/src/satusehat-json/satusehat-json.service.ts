import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncounterJsonDto } from './dto/encounter-json';
import { Cache } from 'cache-manager';
import { time } from 'console';

@Injectable()
export class SatusehatJsonService {
  constructor(private readonly prismaService: PrismaService) {}

  async encounterJson(dto: EncounterJsonDto) {
    const clinics = await this.prismaService.clinics.findFirst({
      where: {
        id: dto.clinicsId,
      },
      select: {
        organizationId: true,
        locationSatuSehatId: true,
        locationName: true,
      },
    });

    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
        where: {
          id: dto.mrid,
        },
        select: {
          queue: true,
          Patient: {
            select: {
              fullname: true,
            },
          },
        },
      });

    return {
      resourceType: 'Encounter',
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/encounter/${clinics.organizationId}`,
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
        reference: `Patient/${dto.patientSatuSehatId}`,
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
            reference: `Practitioner/${dto.practitionerId}`,
            display: dto.practitionerName,
          },
        },
      ],
      period: {
        start: dto.time,
      },
      location: [
        {
          location: {
            reference: `Location/${clinics.locationSatuSehatId}`,
            display: clinics.locationName,
          },
          period: {
            start: dto.time,
          },
        },
      ],
      statusHistory: [
        {
          status: 'arrived',
          period: {
            start: dto.time,
          },
        },
      ],
      serviceProvider: {
        reference: `Organization/${clinics.organizationId}`,
      },
    };
  }
}
