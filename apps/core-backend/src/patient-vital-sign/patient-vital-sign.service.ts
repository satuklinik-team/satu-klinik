import { Injectable } from '@nestjs/common';
import { CreateMRDto } from 'src/patient/create-mr.dto';
import { PatientService } from 'src/patient/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientVitalSignService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientService: PatientService,
  ) {}

  async create(dto: CreateMRDto) {
    const today = new Date();

    const data = await this.prismaService.patient_medical_records.create({
      data: {
        patientId: dto.patientId,
        doctor: '',
        norm: await this.patientService.generateMRID(),
        visitAt: today,
        visitLabel: today.toLocaleDateString(),
        vitalSign: {
          create: {
            height: dto.height || 0,
            weight: dto.weight || 0,
            allergic: dto.allergic || 'n/a',
            systole: dto.systole || 0,
            diastole: dto.diastole || 0,
            pulse: dto.pulse,
            respiration: dto.respiration || 0,
            temperature: dto.temperature || 0,
            visitAt: today,
          },
        },
      },
    });

    return data;
  }
}
