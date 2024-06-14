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
import { FindAllService } from 'src/find-all/find-all.service';
import { GetPatientByIdDto } from './dto/get-patient-by-id-dto';
import { ServiceContext } from 'src/utils/types';
import { UpdatePatientDto } from './dto/update-patient-dto';
import { formatDate } from 'src/utils/helpers/format-date.helper';
import { ActivityTitles } from 'src/activity/dto/activity.dto';
import { ActivityService } from 'src/activity/activity.service';
import { createPatientData } from './dto/factory.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
    private readonly activityService: ActivityService,
  ) {}

  async create(dto: CreatePatientDto, context?: ServiceContext) {
    const prisma = this._initPrisma(context?.tx);

    const patientData = {
      data: {
        norm: await this.generateMedicalRecordNorm(dto.clinicsId),
        ...createPatientData(dto),
      },
    };

    const data = await prisma.patient.create(patientData);

    this.activityService.emit({
      title: ActivityTitles.CREATE_PATIENT,
      usersId: dto.usersId,
      clinicsId: dto.clinicsId,
      payload: patientData,
    });

    return data;
  }

  async updatePatientById(dto: UpdatePatientDto) {
    const patientData = createPatientData(dto);

    const data = await this.prismaService.patient.update({
      where: {
        id: dto.id,
      },
      data: patientData,
    });

    this.activityService.emit({
      title: ActivityTitles.UPDATE_PATIENT,
      usersId: dto.usersId,
      clinicsId: dto.clinicsId,
      payload: patientData,
    });

    return data;
  }

  async findAll(dto: FindAllPatientsDto) {
    const args: Prisma.PatientFindManyArgs = {
      where: this._findAllWhereFactory(dto),
      select: this._findAllSelectFactory(),
    };

    return await this.findAllService.findAll({
      table: this.prismaService.patient,
      ...args,
      ...dto,
    });
  }

  async getPatientById(dto: GetPatientByIdDto) {
    this.canModifyPatient(dto.id, dto.clinicsId);

    return await this.prismaService.patient.findFirst({
      where: {
        id: dto.id,
      },
      select: this._findAllSelectFactory(),
    });
  }

  async delete(dto: DeletePatientDto) {
    await this.canModifyPatient(dto.id, dto.clinicsId);

    const data = await this.prismaService.patient.delete({
      where: { id: dto.id },
    });

    this.activityService.emit({
      title: ActivityTitles.DELETE_PATIENT,
      usersId: dto.usersId,
      clinicsId: dto.clinicsId,
      payload: data,
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
      if (dto.type === FindAllPatientTypes.ALL) {
        return { clinicsId: dto.clinicsId };
      }
      const now = new Date();
      const status = dto.type.at(0).toLowerCase() + '1';

      return {
        clinicsId: dto.clinicsId,
        mr: {
          some: {
            status,
            visitLabel: formatDate(now),
          },
        },
      };
    }
    return {
      clinicsId: dto.clinicsId,
      OR: [
        {
          nik: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
        {
          fullname: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
        {
          norm: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
        {
          address: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
        {
          phone: {
            contains: dto.search,
            mode: 'insensitive',
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
      satuSehatId: true,
      mr: {
        orderBy: { visitAt: 'desc' },
        take: 1,
        select: {
          id: true,
          queue: true,
          status: true,
          vitalSign: true,
        },
      },
    };
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
