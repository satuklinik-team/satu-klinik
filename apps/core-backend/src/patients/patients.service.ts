import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePatientDto) {
    const data = await this.prismaService.patient.create({
      data: {
        norm: await this.generateMedicalRecordNorm(),
        nik: dto.nik,
        fullname: dto.fullname,
        parentname: dto.parentname || '-',
        address: dto.address,
        phone: dto.phone,
        age: dto.age,
        sex: dto.sex,
        blood: dto.blood,
        birthAt: `${dto.birthAt}T00:00:00.000Z`,
        clinicsId: dto.clinicsId,
      },
    });

    return data;
  }

  async findAll(dto: Prisma.PatientFindManyArgs['select'], search: string) {
    const data = await this.prismaService.patient.findMany({
      where: this._findAllFactory(search),
      select: {
        norm: true,
        nik: true,
        fullname: true,
        sex: true,
        blood: true,
        birthAt: true,
        phone: true,
        address: true,
        ...dto,
      },
    });

    return data;
  }

  async generateMedicalRecordNorm() {
    const date = new Date();
    const yearString = date.getFullYear().toString();
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0');
    const nextvalQuery = await this.prismaService.patient.aggregate({
      where: {
        norm: {
          contains: `${yearString}.${monthString}`,
        },
      },
      _max: {
        norm: true,
      },
    });

    let nextval = 0;
    if (nextvalQuery._max.norm !== null) {
      const buff = nextvalQuery._max.norm?.substring(8);
      nextval = Number.parseInt(buff);
    }
    nextval = nextval + 1;
    const rm = `${yearString}.${monthString}.${nextval
      .toString()
      .padStart(5, '0')}`;
    return rm;
  }

  private _findAllFactory(search: string): Prisma.PatientFindManyArgs['where'] {
    if (!search) {
      return {};
    }
    return {
      OR: [
        {
          fullname: {
            startsWith: search,
          },
        },
        {
          norm: {
            startsWith: search,
          },
        },
        {
          address: {
            startsWith: search,
          },
        },
      ],
    };
  }
}
