import { Injectable } from '@nestjs/common';
import {
  GetTasksStatusDto,
  GetTasksStatusTypes,
} from './dto/get-tasks-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { RoleNotAuthorizedException } from 'src/exceptions/unauthorized/role-not-authorized';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(dto: GetTasksStatusDto) {
    let todo: number, completed: number, total: number;
    if (dto.type === GetTasksStatusTypes.GENERAL) {
      completed = await this.getCount({
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
      });

      total = await this.getCount({});

      todo = total - completed;
    } else if (dto.type === GetTasksStatusTypes.DOCTOR) {
      if (dto.role === Role.PHARMACY) {
        throw new RoleNotAuthorizedException();
      }
      todo = await this.getCount({
        status: 'e1',
      });

      completed = await this.getCount({
        OR: [
          {
            status: 'd1',
          },
          {
            status: 'p1',
          },
        ],
      });
    } else if (dto.type === GetTasksStatusTypes.PHARMACY) {
      if (dto.role === Role.DOCTOR) {
        throw new RoleNotAuthorizedException();
      }

      todo = await this.getCount({
        status: 'd1',
        assessment: {
          some: {},
        },
      });

      completed = await this.getCount({
        OR: [
          {
            status: 'p1',
          },
        ],
      });
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

  async getCount(arg: Prisma.Patient_medical_recordsCountArgs['where']) {
    const now = new Date();

    const count = await this.prismaService.patient_medical_records.count({
      where: {
        visitLabel: now.toLocaleDateString(),
        ...arg,
      },
    });

    return count;
  }
}
