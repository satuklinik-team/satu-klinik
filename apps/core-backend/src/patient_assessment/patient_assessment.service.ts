import { Injectable } from '@nestjs/common';
import { CreatePatientAssessmentDto } from './dto/create-patient_assessment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
          ...(dto.icd10Code && { icd10Code: dto.icd10Code }),
          ...(dto.icd9CMCode && { icd9CMCode: dto.icd9CMCode }),
        },
      });

      const prescriptions = await tx.patient_prescription.createMany({
        data: dto.prescriptions,
      });

      return { assessment, prescriptions };
    });

    return data;
  }
}
