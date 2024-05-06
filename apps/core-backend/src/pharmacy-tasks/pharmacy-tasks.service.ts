import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPharmacyTaskDto } from './dto/find-all-pharmacy-task.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';

@Injectable()
export class PharmacyTasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(dto: FindAllPharmacyTaskDto) {
    const today = new Date().toLocaleDateString();
    const data = await this.prismaService.pharmacy_Task.findMany({
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
      skip: dto.skip,
      take: dto.limit,
    });

    const promises = data.map(async (pharmacyTask) => {
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

    let count = null;
    if (dto.count) {
      count = await this.prismaService.pharmacy_Task.count({
        where: {
          clinicsId: dto.clinicsId,
          createdDate: today,
          status: 'Todo',
        },
      });
    }

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
