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

  async create(dto: CreateVitalSignDto) {
    const now = new Date();

    this.patientService.canModifyPatient(dto.patientId, dto.tokenData);

    const data = await this.prismaService.$transaction(async (tx) => {
      const queue = await this._getQueueNo(dto.tokenData.clinicsId, { tx });

      const data = await this.prismaService.patient_medical_records.create({
        data: {
          patientId: dto.patientId,
          doctor: '',
          visitAt: now,
          visitLabel: now.toLocaleDateString(),
          queue,
          status: 'e1',
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
          vitalSign: { orderBy: { id: 'desc' }, take: 1 },
        },
      });

      return data;
    });

    return data;
  }

  async _getQueueNo(clinicsId: string, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);

    const result = await prisma.poli.findFirst({
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

    const today = new Date().toLocaleDateString();
    if (today !== currentDate) {
      currentDate = today;
      counter = 0;
    }
    counter += 1;

    const poli = await prisma.poli.update({
      where: {
        id,
      },
      data: {
        currentDate,
        counter,
      },
      select: { alias: true },
    });

    return `${poli.alias}-${counter}`;
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
