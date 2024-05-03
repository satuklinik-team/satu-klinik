import { Injectable } from '@nestjs/common';
import { CreatePatientAssessmentDto } from './dto/create-patient-assessment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPatientAssessmentDto } from './dto/find-all-patient-assessment.dto';

@Injectable()
export class PatientAssessmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePatientAssessmentDto) {
    const data = await this.prismaService.$transaction(async (tx) => {
      const assessment = await tx.patient_assessment.create({
        data: {
          patient_medical_recordsId: dto.mrid,
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
          medicine: prescription.medicine,
          quantity: prescription.quantity,
          usage: prescription.usage,
          patient_medical_recordsId: dto.mrid,
        };
      });

      const prescriptions = await tx.patient_prescription.createMany({
        data: prescriptionsDto,
      });

      const medicalRecord =
        await this.prismaService.patient_medical_records.update({
          where: {
            id: dto.mrid,
          },
          data: {
            status: 'd1',
          },
        });

      return { assessment, prescriptions, medicalRecord };
    });

    return data;
  }

  async findAll(dto: FindAllPatientAssessmentDto) {
    const data = await this.prismaService.patient_assessment.findMany({
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
      skip: dto.skip,
      take: dto.limit,
    });

    let count = null;
    if (dto.count) {
      count = await this.prismaService.patient_assessment.count({
        where: {
          Patient_medical_records: {
            patientId: dto.patientId,
          },
        },
      });
    }

    return { data, count };
  }
}
