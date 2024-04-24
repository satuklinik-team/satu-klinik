import { Injectable } from '@nestjs/common';
import { CreateVitalSignDto } from 'src/patients-vital-sign/dto/create-vital-sign.dto';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientsVitalSignService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientService: PatientsService,
  ) {}

  async create(dto: CreateVitalSignDto) {
    const now = new Date();

    const data = await this.prismaService.patient_medical_records.create({
      data: {
        patientId: dto.patientId,
        doctor: '',
        norm: await this.patientService.generateMRID(),
        visitAt: now,
        visitLabel: now.toLocaleDateString(),
        vitalSign: {
          create: {
            height: dto.height,
            weight: dto.weight,
            allergic: dto.allergic,
            systole: dto.systole,
            diastole: dto.diastole,
            pulse: dto.pulse,
            respiration: dto.respiration,
            temperature: dto.temperature,
            pain: dto.pain,
            visitAt: now,
          },
        },
      },
    });

    return data;
  }
}
