import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './create-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePatientDto) {
    const today = new Date();

    const data = await this.prismaService.patient.create({
      data: {
        norm: 'dummyMRId',
        nik: dto.nik || '-',
        fullname: dto.fullname,
        parentname: dto.parentname || '-',
        address: dto.address,
        phone: dto.phone,
        age: dto.age || 0,
        sex: dto.sex || 'L',
        blood: dto.blood || '-',
        birthAt: dto.birthAt ? `${dto.birthAt}T00:00:00.000Z` : today,
        createdAt: today,
        mr: {
          create: {
            doctor: '',
            norm: 'dummyMRId',
            visitAt: today,
            visitLabel: today.toLocaleDateString(),
            vitalSign: {
              create: {
                height: dto.height || 0,
                weight: dto.weight || 0,
                allergic: dto.allergic || 'n/a',
                systole: dto.systole || 0,
                diastole: dto.diastole || 0,
                pulse: dto.pulse,
                respiration: dto.respiration || 0,
                temperature: dto.temperature || 0,
                visitAt: today,
              },
            },
          },
        },
      },
    });

    return data;
  }

  async findPatientsBySearch(prefix: string) {
    const data = await this.prismaService.patient.findMany({
      where: {
        OR: [
          {
            fullname: {
              startsWith: prefix,
            },
          },
          {
            norm: {
              startsWith: prefix,
            },
          },
          {
            address: {
              startsWith: prefix,
            },
          },
        ],
      },
      select: {
        norm: true,
        nik: true,
        fullname: true,
        sex: true,
        blood: true,
        birthAt: true,
        phone: true,
        address: true,
      },
    });

    return data;
  }
}
