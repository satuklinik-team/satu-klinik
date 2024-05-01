import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { FindAllPatientsDto } from './dto/find-all-patients-dto';

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
      where: this._findAllFactory(dto.search, dto.clinicsId),
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

  async delete(id: string) {
    const data = await this.prismaService.patient.delete({
      where: {
        id,
      },
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
    search: string,
    clinicsId: string,
  ): Prisma.PatientFindManyArgs['where'] {
    if (!search) {
      return {
        clinicsId,
      };
    }
    return {
      clinicsId,
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
