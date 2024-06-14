import { Injectable } from '@nestjs/common';
import { CreatePatientAssessmentDto } from './dto/create-patient-assessment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPatientAssessmentDto } from './dto/find-all-patient-assessment.dto';
import { PatientsService } from 'src/patients/patients.service';
import { Patient_assessment, Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';
import { MedicineService } from 'src/medicine/medicine.service';
import { RevenueService } from 'src/revenue/revenue.service';
import { UpdatePatientAssessmentDto } from './dto/update-patient-assessment.dto';
import { DifferentPractitionerException } from 'src/exceptions/bad-request/different-practitioner-exception';
import { formatDate } from 'src/utils/helpers/format-date.helper';
import { MRAlready2DaysException } from 'src/exceptions/bad-request/mr-already-two-days-exception';
import { dayDifference } from 'src/utils/helpers/find-day-difference';

@Injectable()
export class PatientAssessmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientsService: PatientsService,
    private readonly findAllService: FindAllService,
    private readonly medicineService: MedicineService,
    private readonly revenueService: RevenueService,
  ) {}

  async createOrUpdate(
    dto: CreatePatientAssessmentDto | UpdatePatientAssessmentDto,
  ) {
    const data = await this.prismaService.$transaction(async (tx) => {
      const patientMR = await tx.patient_medical_records.findFirst({
        where: { id: dto.mrid },
        select: {
          Patient: {
            select: {
              id: true,
              norm: true,
              clinicsId: true,
            },
          },
        },
      });

      await this.patientsService.canModifyPatient(
        patientMR.Patient.id,
        dto.clinicsId,
      );

      const assessmentData: Prisma.Patient_assessmentCreateArgs['data'] = {
        patient_medical_recordsId: dto.mrid,
        doctorId: dto.usersId,
        subjective: dto.subjective,
        objective: dto.objective,
        assessment: dto.assessment,
        plan: dto.plan,
        icd10Code: dto.icd10Code,
        icd9CMCode: dto.icd9CMCode != undefined ? dto.icd9CMCode : null,
        syncedWithSatuSehat: false,
      };

      let assessment: Patient_assessment;
      if (dto instanceof CreatePatientAssessmentDto) {
        assessment = await tx.patient_assessment.create({
          data: assessmentData,
        });
      } else {
        assessment = await tx.patient_assessment.findFirst({
          where: {
            id: dto.id,
          },
        });

        if (dto.usersId !== assessment.doctorId) {
          throw new DifferentPractitionerException();
        }

        if (dayDifference(assessment.createdAt, new Date()) >= 2) {
          throw new MRAlready2DaysException();
        }

        assessment = await tx.patient_assessment.update({
          where: {
            id: dto.id,
          },
          data: assessmentData,
        });
      }

      await tx.patient_prescription.updateMany({
        where: {
          patient_medical_recordsId: assessment.patient_medical_recordsId,
          status: 'completed',
        },
        data: {
          syncedWithSatuSehat: false,
          status: 'cancelled',
        },
      });

      const prescriptionsDto = dto.prescriptions.map((prescription) => {
        return {
          ...prescription,
          patient_medical_recordsId: assessment.patient_medical_recordsId,
        };
      });

      const prescriptions = await tx.patient_prescription.createMany({
        data: prescriptionsDto,
      });

      for (const prescription of prescriptionsDto) {
        await this.medicineService.canModifyMedicine(
          prescription.medicineId,
          dto.clinicsId,
        );

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
      }

      const medicalRecord = await tx.patient_medical_records.update({
        where: {
          id: assessment.patient_medical_recordsId,
        },
        data: {
          status: 'd1',
        },
      });

      if (dto instanceof CreatePatientAssessmentDto) {
        const serviceFee = await tx.setting.findFirst({
          where: {
            clinicsId: dto.clinicsId,
            name: 'SERVICEFEE',
          },
        });

        await this.revenueService.increaseRevenue(
          { value: parseInt(serviceFee.value), clinicsId: dto.clinicsId },
          { tx },
        );
      }

      let pharmacyTask = await tx.pharmacy_Task.findFirst({
        where: {
          assessmentReffId: assessment.patient_medical_recordsId,
        },
      });

      if (!pharmacyTask) {
        if (prescriptionsDto.length !== 0) {
          pharmacyTask = await tx.pharmacy_Task.create({
            data: {
              norm: patientMR.Patient.norm,
              assessmentReffId: assessment.patient_medical_recordsId,
              clinicsId: patientMR.Patient.clinicsId,
              createdDate: formatDate(new Date()),
              status: 'Todo',
            },
          });
        }
      } else {
        if (prescriptionsDto.length === 0 && pharmacyTask.status === 'Todo') {
          await tx.pharmacy_Task.delete({
            where: {
              id: pharmacyTask.id,
            },
          });
        } else {
          await tx.pharmacy_Task.update({
            where: {
              id: pharmacyTask.id,
            },
            data: {
              status: 'Revision',
            },
          });
        }
      }

      return {
        assessment,
        prescriptions,
        medicalRecord,
        pharmacyTask,
      };
    });

    return data;
  }

  async findAll(dto: FindAllPatientAssessmentDto) {
    await this.patientsService.canModifyPatient(dto.patientId, dto.clinicsId);

    const args: Prisma.Patient_assessmentFindManyArgs = {
      where: {
        Patient_medical_records: {
          patientId: dto.patientId,
        },
      },
      select: {
        id: true,
        subjective: true,
        objective: true,
        assessment: true,
        plan: true,
        icd10: true,
        icd9CM: true,
        Patient_medical_records: {
          select: {
            id: true,
            visitLabel: true,
            prescription: true,
          },
        },
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.patient_assessment,
      ...args,
      ...dto,
    });
  }
}
