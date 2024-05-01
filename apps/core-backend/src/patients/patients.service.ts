import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  FindAllPatientTypes,
  FindAllPatientsDto,
} from './dto/find-all-patients-dto';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';

@Injectable()
export class PatientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePatientDto) {
    await this.checkAuthorized(dto.usersId, dto.clinicsId);

    const data = await this.prismaService.patient.create({
      data: {
        norm: await this.generateMedicalRecordNorm(dto.clinicsId),
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

  async findAll(dto: FindAllPatientsDto) {
    const data = await this.prismaService.patient.findMany({
      where: this._findAllFactory(dto),
      select: {
        id: true,
        norm: true,
        nik: true,
        fullname: true,
        sex: true,
        blood: true,
        birthAt: true,
        phone: true,
        address: true,
        mr: {
          orderBy: { visitAt: 'desc' },
          take: 1,
          select: { vitalSign: { take: 1 } },
        },
      },
      skip: dto.skip,
      take: dto.limit,
    });

    return data;
  }

  async generateMedicalRecordNorm(clinicsId: string) {
    const date = new Date();
    const yearString = date.getFullYear().toString();
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0');
    const nextvalQuery = await this.prismaService.patient.aggregate({
      where: {
        clinicsId,
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

  private _findAllFactory(
    dto: FindAllPatientsDto,
  ): Prisma.PatientFindManyArgs['where'] {
    if (!dto.search) {
      if (dto.type == FindAllPatientTypes.ALL) {
        return {};
      }
      const now = new Date();
      const status = dto.type.at(0).toLowerCase() + '1';

      return {
        mr: {
          some: {
            AND: [{ status }, { visitLabel: now.toLocaleDateString() }],
          },
        },
      };
    }
    return {
      OR: [
        {
          fullname: {
            startsWith: dto.search,
          },
        },
        {
          norm: {
            startsWith: dto.search,
          },
        },
        {
          address: {
            startsWith: dto.search,
          },
        },
      ],
    };
  }

  async checkAuthorized(usersId: string, clinicsId: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: usersId,
      },
    });

    if (clinicsId !== user.clinicsId) {
      const clinic = await this.prismaService.clinics.findFirst({
        where: {
          id: clinicsId,
        },
        select: {
          Accounts: true,
        },
      });

      if (clinic.Accounts.usersId !== usersId) {
        throw new CannotAccessClinicException();
      }
    }
  }
}
