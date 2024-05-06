import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  FindAllPatientTypes,
  FindAllPatientsDto,
} from './dto/find-all-patients-dto';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { DeletePatientDto } from './dto/delete-patient.dto';
import { JwtPayload } from 'src/auth/types';

@Injectable()
export class PatientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePatientDto) {
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
      where: this._findAllWhereFactory(dto),
      select: this._findAllSelectFactory(),
      skip: dto.skip,
      take: dto.limit,
    });

    let count = null;
    if (dto.count) {
      count = await this.prismaService.patient.count({
        where: this._findAllWhereFactory(dto),
      });
    }

    return { data, count };
  }

  async delete(dto: DeletePatientDto) {
    await this.canModifyPatient(dto.id, dto.clinicsId);

    const data = await this.prismaService.patient.delete({
      where: { id: dto.id },
    });

    return data;
  }

  async canModifyPatient(patientId: string, clinicsId: string) {
    const patient = await this.prismaService.patient.findFirst({
      where: {
        id: patientId,
      },
      select: {
        clinicsId: true,
      },
    });

    if (patient.clinicsId !== clinicsId) {
      throw new CannotAccessClinicException();
    }
  }

  async generateMedicalRecordNorm(clinicsId: string) {
    const date = new Date();
    const yearString = date.getFullYear().toString();
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0');
    const nextvalQuery = await this.prismaService.patient.aggregate({
      where: {
        clinicsId,
        norm: {
          startsWith: `${yearString}.${monthString}`,
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

  private _findAllWhereFactory(
    dto: FindAllPatientsDto,
  ): Prisma.PatientFindManyArgs['where'] {
    if (!dto.search) {
      if (dto.type == FindAllPatientTypes.ALL) {
        return {};
      }
      const now = new Date();
      const status = dto.type.at(0).toLowerCase() + '1';

      return {
        clinicsId: dto.clinicsId,
        mr: {
          some: {
            status,
            visitLabel: now.toLocaleDateString(),
          },
        },
      };
    }
    return {
      clinicsId: dto.clinicsId,
      OR: [
        {
          nik: {
            startsWith: dto.search,
          },
        },
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
        {
          phone: {
            startsWith: dto.search,
          },
        },
      ],
    };
  }

  private _findAllSelectFactory(): Prisma.PatientFindManyArgs['select'] {
    return {
      id: true,
      norm: true,
      nik: true,
      fullname: true,
      sex: true,
      blood: true,
      birthAt: true,
      phone: true,
      address: true,
      clinicsId: true,
      mr: {
        orderBy: { visitAt: 'desc' },
        take: 1,
        select: {
          id: true,
          queue: true,
          status: true,
          vitalSign: { orderBy: { id: 'desc' }, take: 1 },
        },
      },
    };
  }
}
