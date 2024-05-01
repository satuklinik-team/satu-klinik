import { Injectable } from '@nestjs/common';
import { CreateVitalSignDto } from 'src/patients-vital-signs/dto/create-vital-sign.dto';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientsVitalSignsService {
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
        visitAt: now,
        visitLabel: now.toLocaleDateString(),
        status: 'e1',
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
          },
        },
      },
    });

    return data;
  }
}
