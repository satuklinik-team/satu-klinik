import { Injectable } from '@nestjs/common';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { CreateVitalSignDto } from 'src/patients-vital-signs/dto/create-vital-sign.dto';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceContext } from 'src/utils/types';

@Injectable()
export class PatientsVitalSignsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientService: PatientsService,
  ) {}

  async create(dto: any) {
    const now = new Date();

    if (dto.patientId) {
      await this.patientService.canModifyPatient(dto.patientId, dto.clinicsId);
    }

    const data = await this.prismaService.$transaction(async (tx) => {
      let patient: any;
      if (!dto.patientId) {
        patient = await this.patientService.create(dto, { tx });
        dto.patientId = patient.id;
      }

      const queue = await this._getQueueNo(dto.clinicsId, { tx });

      const data = await tx.patient_medical_records.create({
        data: {
          patientId: dto.patientId,
          visitAt: now,
          visitLabel: now.toLocaleDateString('en-GB'),
          queue,
          status: 'e1',
          practitionerId: dto.usersId,
          vitalSign: {
            create: {
              height: dto.height,
              weight: dto.weight,
              allergic: dto.allergic,
              systole: dto.systole,
              diastole: dto.diastole,
              pulse: dto.pulse,
              respiration: dto.respiration,
              temperature: dto.temperature,
              pain: dto.pain,
            },
          },
        },
        select: {
          id: true,
          status: true,
          queue: true,
          visitAt: true,
          visitLabel: true,
          vitalSign: { orderBy: { id: 'desc' }, take: 1 },
        },
      });

      const result = {
        ...data,
        visitAt: data.visitAt.toLocaleString('en-GB'),
      };

      if (patient === undefined) {
        return result;
      }
      return {
        patient,
        patientVitalSign: result,
      };
    });

    return data;
  }

  async _getQueueNo(clinicsId: string, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);

    const result = await prisma.departments.findFirst({
      where: {
        clinicsId,
        name: 'main',
      },
      select: {
        id: true,
        counter: true,
        currentDate: true,
      },
    });

    const { id } = result;
    let { counter, currentDate } = result;

    const today = new Date().toLocaleDateString('en-GB');
    if (today !== currentDate) {
      currentDate = today;
      counter = 0;
    }
    counter += 1;

    const department = await prisma.departments.update({
      where: {
        id,
      },
      data: {
        currentDate,
        counter,
      },
      select: { alias: true },
    });

    return `${department.alias}-${counter}`;
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
