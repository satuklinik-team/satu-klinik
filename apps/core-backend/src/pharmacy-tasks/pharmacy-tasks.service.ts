import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPharmacyTaskDto } from './dto/find-all-pharmacy-task.dto';
import { CompletePharmacyTaskDto } from './dto/complete-pharmacy-task.dto';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';
import { FindPharmacyTaskByIdDto } from './dto/find-pharmacy-task-by-id.dto';
import { IncorrectPrescriptionIdException } from 'src/exceptions/bad-request/incorrect-prescription-id-exception';
import { RevenueService } from 'src/revenue/revenue.service';
import { formatDate } from 'src/utils/helpers/format-date.helper';

@Injectable()
export class PharmacyTasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
    private readonly revenueService: RevenueService,
  ) {}

  async findAll(dto: FindAllPharmacyTaskDto) {
    const today = formatDate(new Date());

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
      },
    });

    if (mr.Patient.clinicsId !== dto.clinicsId) {
      throw new CannotAccessClinicException();
    }

    const prescriptionSelect: Prisma.Patient_prescriptionSelect = {
      id: true,
      createdAt: true,
      frequency: true,
      period: true,
      doseQuantity: true,
      totalQuantity: true,
      supplyDuration: true,
      notes: true,
      deletedAt: true,
      Medicine: true,
    };

    const cancelledPrescriptions =
      await this.prismaService.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: pharmacyTask.assessmentReffId,
          status: 'cancelled',
          includeInPharmacyTask: true,
          Medication_dispense: {
            some: {},
          },
        },
        select: prescriptionSelect,
      });

    const newPrescriptions =
      await this.prismaService.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: pharmacyTask.assessmentReffId,
          status: 'completed',
        },
        select: prescriptionSelect,
      });

    return {
      pharmacyTask,
      cancelledPrescriptions,
      newPrescriptions,
    };
  }

  async completeTask(dto: CompletePharmacyTaskDto) {
    const data = await this.prismaService.$transaction(async (tx) => {
      const pharmacyTask = await tx.pharmacy_Task.update({
        where: {
          id: dto.id,
        },
        data: {
          doneAt: new Date(),
          status: 'Done',
          pharmacist: dto.usersId,
        },
      });

      if (pharmacyTask.clinicsId !== dto.clinicsId) {
        throw new CannotAccessClinicException();
      }

      await tx.patient_medical_records.update({
        where: {
          id: pharmacyTask.assessmentReffId,
        },
        data: {
          status: 'p1',
        },
      });

      const cancelledPrescriptions = await tx.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: pharmacyTask.assessmentReffId,
          status: 'cancelled',
          includeInPharmacyTask: true,
          Medication_dispense: {
            some: {},
          },
        },
      });

      await tx.patient_prescription.updateMany({
        where: {
          patient_medical_recordsId: pharmacyTask.assessmentReffId,
          status: 'cancelled',
        },
        data: {
          includeInPharmacyTask: false,
        },
      });

      const newPrescriptions = await tx.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: pharmacyTask.assessmentReffId,
          status: 'completed',
        },
      });

      const cancelledPrescriptionsId = cancelledPrescriptions.map(
        (prescription) => prescription.id,
      );

      const newPrescriptionsId = newPrescriptions.map(
        (prescription) => prescription.id,
      );

      const isSubset =
        dto.cancelledPrescriptionsId.every((prescriptionId) =>
          cancelledPrescriptionsId.includes(prescriptionId),
        ) &&
        dto.boughtPrescriptionsId.every((prescriptionId) =>
          newPrescriptionsId.includes(prescriptionId),
        );

      if (!isSubset) {
        throw new IncorrectPrescriptionIdException();
      }

      const notBoughtPrescriptionsId = newPrescriptionsId.filter(
        (id) => !dto.boughtPrescriptionsId.includes(id),
      );

      for (const prescriptionId of notBoughtPrescriptionsId) {
        const prescription = await tx.patient_prescription.findFirst({
          where: {
            id: prescriptionId,
          },
        });

        await tx.medicine.update({
          where: {
            id: prescription.medicineId,
          },
          data: {
            stock: {
              increment: prescription.totalQuantity,
            },
          },
        });
      }

      for (const prescriptionId of dto.boughtPrescriptionsId) {
        const prescription = await tx.patient_prescription.findFirst({
          where: {
            id: prescriptionId,
          },
          select: {
            Medicine: true,
            id: true,
            medicineId: true,
            type: true,
            frequency: true,
            period: true,
            doseQuantity: true,
            totalQuantity: true,
            supplyDuration: true,
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, Medicine, ...medicationDispense } = prescription;

        await tx.medication_dispense.create({
          data: {
            ...medicationDispense,
            patient_prescriptionId: prescription.id,
            clinicsId: dto.clinicsId,
          },
        });

        await this.revenueService.increaseRevenue(
          {
            value: this.revenueService.findMedicineRevenue(
              prescription.Medicine,
            ),
            clinicsId: dto.clinicsId,
          },
          { tx },
        );
      }

      for (const prescriptionId of dto.cancelledPrescriptionsId) {
        await tx.medication_dispense.updateMany({
          where: {
            patient_prescriptionId: prescriptionId,
          },
          data: {
            status: 'cancelled',
            syncedWithSatuSehat: false,
          },
        });

        const prescription = await tx.patient_prescription.findFirst({
          where: {
            id: prescriptionId,
          },
          select: {
            Medicine: true,
            medicineId: true,
            totalQuantity: true,
          },
        });

        await tx.medicine.update({
          where: {
            id: prescription.medicineId,
          },
          data: {
            stock: {
              increment: prescription.totalQuantity,
            },
          },
        });

        await this.revenueService.increaseRevenue(
          {
            value: -this.revenueService.findMedicineRevenue(
              prescription.Medicine,
            ),
            clinicsId: dto.clinicsId,
          },
          { tx },
        );
      }

      return pharmacyTask;
    });

    return data;
  }
}
