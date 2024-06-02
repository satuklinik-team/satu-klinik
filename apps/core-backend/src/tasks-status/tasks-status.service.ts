import { Injectable } from '@nestjs/common';
import {
  GetTasksStatusDto,
  GetTasksStatusTypes,
} from './dto/get-tasks-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { RoleNotAuthorizedException } from 'src/exceptions/unauthorized/role-not-authorized';
import { GetNotificationDto } from './dto/get-notification-dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(dto: GetTasksStatusDto) {
    let todo: number, completed: number, total: number;
    if (dto.type === GetTasksStatusTypes.GENERAL) {
      if (dto.role === Role.PHARMACY || dto.role === Role.DOCTOR) {
        throw new RoleNotAuthorizedException();
      }

      completed = await this.getCount(
        {
          OR: [
            {
              status: 'd1',
              assessment: {
                none: {},
              },
            },
            {
              status: 'p1',
            },
          ],
        },
        dto.clinicsId,
      );

      total = await this.getCount({}, dto.clinicsId);

      todo = total - completed;
    } else if (dto.type === GetTasksStatusTypes.DOCTOR) {
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
          OR: [
            {
              status: 'p1',
            },
          ],
        },
        dto.clinicsId,
      );
    }

    if (total === undefined) {
      total = todo + completed;
    }

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
            await this.get({
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
            await this.get({
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
        visitLabel: now.toLocaleDateString(),
        ...arg,
      },
    });

    return count;
  }
}
