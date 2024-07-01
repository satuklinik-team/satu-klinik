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
import { ActivityService } from 'src/activity/activity.service';
import { ActivityTitles } from 'src/activity/dto/activity.dto';

@Injectable()
export class PharmacyTasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
    private readonly revenueService: RevenueService,
    private readonly activityService: ActivityService,
  ) {}

  async findAll(dto: FindAllPharmacyTaskDto) {
    const today = formatDate(new Date());

    const args: Prisma.Pharmacy_TaskFindManyArgs = {
      where: {
        clinicsId: dto.clinicsId,
        createdDate: today,
        OR: [{ status: 'Todo' }, { status: 'Revision' }],
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
          include: {
            mr: {
              select: {
                queue: true,
              },
              orderBy: {
                visitAt: 'desc',
              },
              take: 1,
            },
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
        select: this._prescriptionSelectFactory(),
      });

    const newPrescriptions =
      await this.prismaService.patient_prescription.findMany({
        where: {
          patient_medical_recordsId: pharmacyTask.assessmentReffId,
          status: 'completed',
        },
        select: this._prescriptionSelectFactory(),
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
        select: this._prescriptionSelectFactory(),
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
        select: this._prescriptionSelectFactory(),
      });

      const boughtPrescriptions = await Promise.all(
        dto.boughtPrescriptionsId.map(async (prescriptionId: number) => {
          return await tx.patient_prescription.findFirst({
            where: {
              id: prescriptionId,
            },
            select: this._prescriptionSelectFactory(),
          });
        }),
      );

      const newPrescriptionsId = newPrescriptions.map(
        (prescription) => prescription.id,
      );

      const isSubset = dto.boughtPrescriptionsId.every((prescriptionId) =>
        newPrescriptionsId.includes(prescriptionId),
      );

      if (!isSubset) {
        throw new IncorrectPrescriptionIdException();
      }

      for (const prescription of boughtPrescriptions) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, Medicine, ...medicationDispense } = prescription;

        await tx.medicine.update({
          where: {
            id: prescription.medicineId,
          },
          data: {
            stock: {
              decrement: prescription.totalQuantity,
            },
          },
        });

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

      for (const prescription of cancelledPrescriptions) {
        await tx.medication_dispense.updateMany({
          where: {
            patient_prescriptionId: prescription.id,
          },
          data: {
            status: 'cancelled',
            syncedWithSatuSehat: false,
          },
        });

        await tx.medicine.update({
          where: {
            id: prescription.Medicine.id,
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

      this.activityService.emit({
        title: ActivityTitles.COMPLETE_PHARMACY_TASK,
        clinicsId: dto.clinicsId,
        usersId: dto.usersId,
        payload: {
          id: dto.id,
          cancelledPrescriptions,
          boughtPrescriptions,
        },
      });

      return pharmacyTask;
    });

    return data;
  }

  private _prescriptionSelectFactory(): Prisma.Patient_prescriptionFindFirstArgs['select'] {
    return {
      id: true,
      Medicine: true,
      createdAt: true,
      frequency: true,
      period: true,
      doseQuantity: true,
      totalQuantity: true,
      supplyDuration: true,
      notes: true,
      deletedAt: true,
    };
  }
}
