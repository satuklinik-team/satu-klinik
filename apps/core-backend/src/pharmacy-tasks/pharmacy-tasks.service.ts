import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPharmacyTaskDto } from './dto/find-all-pharmacy-task.dto';

@Injectable()
export class PharmacyTasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(dto: FindAllPharmacyTaskDto) {
    const data = await this.prismaService.pharmacy_Task.findMany({
      where: {
        clinicsId: dto.tokenData.clinicsId,
        createdDate: new Date().toLocaleDateString(),
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
      console.log(pharmacyTask);
      return {
        id: pharmacyTask.id,
        status: pharmacyTask.status,
        assessmentReffId: pharmacyTask.assessmentReffId,
        patient: await this.prismaService.patient.findFirst({
          where: {
            norm: pharmacyTask.norm,
            clinicsId: dto.tokenData.clinicsId,
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
          clinicsId: dto.tokenData.clinicsId,
        },
      });
    }

    return { data: mappedData, count };
  }
}
