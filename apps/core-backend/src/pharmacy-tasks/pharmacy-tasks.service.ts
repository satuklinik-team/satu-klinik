import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPharmacyTaskDto } from './dto/find-all-pharmacy-task.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';
import { FindPharmacyTaskByIdDto } from './dto/find-pharmacy-task-by-id.dto';
import { IncorrectPrescriptionIdException } from 'src/exceptions/bad-request/incorrect-prescription-id-exception';

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
      };
    });

    const mappedData = await Promise.all(promises);

    return { data: mappedData, count };
  }

  async findById(dto: FindPharmacyTaskByIdDto) {
    const pharmacyTask = await this.prismaService.pharmacy_Task.findFirst({
      where: {
        id: dto.id,
      },
      select: {
        assessmentReffId: true,
      },
    });
    const mr = await this.prismaService.patient_medical_records.findFirst({
      where: {
        id: pharmacyTask.assessmentReffId,
      },
      select: {
        Patient: {
          select: {
            clinicsId: true,
          },
        },
        prescription: true,
      },
    });

    if (mr.Patient.clinicsId !== dto.clinicsId) {
      throw new CannotAccessClinicException();
    }

    return {
      ...pharmacyTask,
      prescriptions: mr.prescription,
    };
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

      const patientPrescriptions = await tx.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: pharmacyTask.assessmentReffId,
        },
        select: {
          id: true,
        },
      });

      const patientPrescriptionIds = patientPrescriptions.map(
        (prescription) => prescription.id,
      );

      const isSubset = dto.boughtPrescriptionsId.every((prescriptionId) =>
        patientPrescriptionIds.includes(prescriptionId),
      );
      if (!isSubset) {
        throw new IncorrectPrescriptionIdException();
      }

      const notBoughtPrescriptionsId = patientPrescriptionIds.filter(
        (id) => !dto.boughtPrescriptionsId.includes(id),
      );

      for (const prescriptionId of notBoughtPrescriptionsId) {
        const prescription = await tx.patient_prescription.findFirst({
          where: {
            id: prescriptionId,
          },
          select: {
            medicineId: true,
            patient_medical_recordsId: true,
            quantity: true,
          },
        });

        await tx.medicine.update({
          where: {
            id: prescription.medicineId,
          },
          data: {
            stock: {
              increment: prescription.quantity,
            },
          },
        });
      }

      return pharmacyTask;
    });

    return data;
  }
}
