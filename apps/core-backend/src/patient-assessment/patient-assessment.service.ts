import { Injectable } from '@nestjs/common';
import { CreatePatientAssessmentDto } from './dto/create-patient-assessment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPatientAssessmentDto } from './dto/find-all-patient-assessment.dto';
import { PatientsService } from 'src/patients/patients.service';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';
import { MedicineCategoryService } from 'src/medicine-category/medicine-category.service';
import { MedicineService } from 'src/medicine/medicine.service';
import { RevenueService } from 'src/revenue/revenue.service';
import { UpdatePatientAssessmentDto } from './dto/update-patient-assessment.dto';
import { DifferentPractitionerException } from 'src/exceptions/bad-request/different-practitioner-exception';

@Injectable()
export class PatientAssessmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientsService: PatientsService,
    private readonly findAllService: FindAllService,
    private readonly medicineService: MedicineService,
    private readonly revenueService: RevenueService,
  ) {}

  async create(dto: CreatePatientAssessmentDto) {
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

      const assessment = tx.patient_assessment.create({
        data: {
          patient_medical_recordsId: dto.mrid,
          doctorId: dto.usersId,
          subjective: dto.subjective,
          objective: dto.objective,
          assessment: dto.assessment,
          plan: dto.plan,
          icd10Code: dto.icd10Code,
          icd9CMCode: dto.icd9CMCode,
        },
      });

      const prescriptionsDto = dto.prescriptions.map((prescription) => {
        return {
          ...prescription,
          patient_medical_recordsId: dto.mrid,
        };
      });

      const prescriptions = tx.patient_prescription.createMany({
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

      const medicalRecord = tx.patient_medical_records.update({
        where: {
          id: dto.mrid,
        },
        data: {
          status: 'd1',
        },
      });

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

      let pharmacyTask = null;
      if (prescriptionsDto.length !== 0) {
        pharmacyTask = tx.pharmacy_Task.create({
          data: {
            norm: patientMR.Patient.norm,
            assessmentReffId: dto.mrid,
            clinicsId: patientMR.Patient.clinicsId,
            createdDate: new Date().toLocaleDateString('en-GB'),
            status: 'Todo',
          },
        });
      }

      return {
        assessment: await assessment,
        prescriptions: await prescriptions,
        medicalRecord: await medicalRecord,
        pharmacyTask: await pharmacyTask,
      };
    });

    return data;
  }

  async update(dto: UpdatePatientAssessmentDto) {
    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
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

    const data = await this.prismaService.$transaction(async (tx) => {
      const data = await tx.patient_assessment.update({
        where: {
          id: dto.id,
        },
        data: {
          patient_medical_recordsId: dto.mrid,
          subjective: dto.subjective,
          objective: dto.objective,
          assessment: dto.assessment,
          plan: dto.plan,
          icd10Code: dto.icd10Code,
          icd9CMCode: dto.icd9CMCode,
          syncedWithSatuSehat: false,
        },
      });

      if (data.doctorId !== dto.usersId) {
        throw new DifferentPractitionerException();
      }
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
