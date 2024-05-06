import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPharmacyTaskDto } from './dto/find-all-pharmacy-task.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';

@Injectable()
export class PharmacyTasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
  ) {}

  async findAll(dto: FindAllPharmacyTaskDto) {
    const today = new Date().toLocaleDateString();

    const args: Prisma.Pharmacy_TaskFindManyArgs = {
      where: {
        clinicsId: dto.clinicsId,
        createdDate: today,
        status: 'Todo',
      },
      select: {
        id: true,
        status: true,
        assessmentReffId: true,
        norm: true,
        createdDate: true,
      },
    };

    const { data, count } = await this.findAllService.findAll({
      table: this.prismaService.pharmacy_Task,
      ...args,
      ...dto,
    });

    const promises = data.map(async (pharmacyTask: any) => {
      return {
        id: pharmacyTask.id,
        status: pharmacyTask.status,
        assessmentReffId: pharmacyTask.assessmentReffId,
        patient: await this.prismaService.patient.findFirst({
          where: {
            norm: pharmacyTask.norm,
            clinicsId: dto.clinicsId,
          },
        }),
        prescriptions: await this.prismaService.patient_prescription.findMany({
          where: {
            patient_medical_recordsId: pharmacyTask.assessmentReffId,
          },
        }),
      };
    });

    const mappedData = await Promise.all(promises);

    return { data: mappedData, count };
  }

  async completeTask(dto: CompleteTaskDto) {
    const data = await this.prismaService.$transaction(async (tx) => {
      const pharmacyTask = await tx.pharmacy_Task.update({
        where: {
          id: dto.id,
        },
        data: {
          status: 'Done',
        },
      });

      if (pharmacyTask.clinicsId !== dto.clinicsId) {
        throw new CannotAccessClinicException();
      }

      return pharmacyTask;
    });

    return data;
  }
}
