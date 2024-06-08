import { Injectable } from '@nestjs/common';
import {
  GetTasksStatusDto,
  GetTasksStatusTypes,
} from './dto/get-tasks-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { RoleNotAuthorizedException } from 'src/exceptions/unauthorized/role-not-authorized';
import { GetNotificationDto } from './dto/get-notification-dto';
import { formatDate } from 'src/utils/helpers/format-date.helper';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(dto: GetTasksStatusDto) {
    if (dto.type === GetTasksStatusTypes.GENERAL) {
      return await this.getGeneralTaskStatus(dto);
    }
    return await this.getDoctorPharmacyTaskStatus(dto);
  }

  async getGeneralTaskStatus(dto: GetTasksStatusDto) {
    if (dto.role === Role.PHARMACY) {
      throw new RoleNotAuthorizedException();
    }

    const date = formatDate(new Date());

    const todayPatient =
      await this.prismaService.patient_medical_records.aggregate({
        where: {
          visitLabel: date,
          Patient: {
            clinicsId: dto.clinicsId,
          },
        },
        _count: true,
      });

    const todayRevenue = await this.prismaService.revenue.findFirst({
      where: {
        clinicsId: dto.clinicsId,
        date,
      },
    });

    const todayPrescription = await this.prismaService.pharmacy_Task.aggregate({
      where: {
        createdDate: date,
        clinicsId: dto.clinicsId,
      },
      _count: true,
    });

    const totalPatient = await this.prismaService.patient.aggregate({
      where: {
        clinicsId: dto.clinicsId,
      },
      _count: true,
    });

    return {
      todayPatient: todayPatient._count,
      todayRevenue: todayRevenue?.total ?? 0,
      todayPrescription: todayPrescription._count,
      totalPatient: totalPatient._count,
    };
  }

  async getDoctorPharmacyTaskStatus(dto: GetTasksStatusDto) {
    let todo: number, completed: number;
    if (dto.type === GetTasksStatusTypes.DOCTOR) {
      if (dto.role === Role.PHARMACY) {
        throw new RoleNotAuthorizedException();
      }
      todo = await this.getCount(
        {
          status: 'e1',
        },
        dto.clinicsId,
      );

      completed = await this.getCount(
        {
          OR: [
            {
              status: 'd1',
            },
            {
              status: 'p1',
            },
          ],
        },
        dto.clinicsId,
      );
    } else if (dto.type === GetTasksStatusTypes.PHARMACY) {
      if (dto.role === Role.DOCTOR) {
        throw new RoleNotAuthorizedException();
      }

      todo = await this.getCount(
        {
          status: 'd1',
          assessment: {
            some: {},
          },
        },
        dto.clinicsId,
      );

      completed = await this.getCount(
        {
          status: 'p1',
        },
        dto.clinicsId,
      );
    }

    const total = todo + completed;

    return {
      todo,
      completed,
      total,
    };
  }

  async getNotification(dto: GetNotificationDto) {
    let response = {};

    if (dto.role !== Role.PHARMACY) {
      response = {
        ...response,
        doctorTask:
          (
            await this.getDoctorPharmacyTaskStatus({
              ...dto,
              type: GetTasksStatusTypes.DOCTOR,
            })
          ).todo > 0,
      };
    }

    if (dto.role !== Role.DOCTOR) {
      response = {
        ...response,
        pharmacyTask:
          (
            await this.getDoctorPharmacyTaskStatus({
              ...dto,
              type: GetTasksStatusTypes.PHARMACY,
            })
          ).todo > 0,
      };
    }

    return response;
  }

  async getCount(
    arg: Prisma.Patient_medical_recordsCountArgs['where'],
    clinicsId: string,
  ) {
    const now = new Date();

    const count = await this.prismaService.patient_medical_records.count({
      where: {
        Patient: {
          clinicsId,
        },
        visitLabel: formatDate(now),
        ...arg,
      },
    });

    return count;
  }
}
