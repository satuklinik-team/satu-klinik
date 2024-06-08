import { Injectable } from '@nestjs/common';
import { FindAllService } from 'src/find-all/find-all.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllMRDto } from './dto/find-all-mr.dto';
import { Prisma } from '@prisma/client';
import { count } from 'console';
import { GetMRByIdDto } from './dto/get-mr-by-id.dto';
import { PatientsService } from 'src/patients/patients.service';
import { DeleteMRByIdDto } from './dto/delete-mr-by-id.dto';
import { AlreadyIntegratedException } from 'src/exceptions/bad-request/already-integrated-exception';

@Injectable()
export class PatientMedicalRecordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientsService: PatientsService,
    private readonly findAllService: FindAllService,
  ) {}

  async findAll(dto: FindAllMRDto) {
    const args: Prisma.Patient_medical_recordsFindManyArgs = {
      where: {
        Patient: {
          clinicsId: dto.clinicsId,
        },
        visitLabel: {
          gte: dto.from,
          lte: dto.to,
        },
      },
      orderBy: {
        visitAt: 'asc',
      },
      select: this._findAllSelectFactory(),
    };

    let data = await this.findAllService.findAll({
      table: this.prismaService.patient_medical_records,
      ...args,
      ...dto,
    });

    data = {
      count: data.count,
      data: data.data.map((entry: any) => {
        return {
          ...entry,
          visitAt: entry.visitAt.toLocaleString('en-GB'),
        };
      }),
    };

    return data;
  }

  async getById(dto: GetMRByIdDto) {
    await this.canModifyMR(dto.id, dto.clinicsId);

    return await this.prismaService.patient_medical_records.findFirst({
      where: {
        id: dto.id,
      },
      select: {
        ...this._findAllSelectFactory(),
        assessment: true,
      },
    });
  }

  async deleteById(dto: DeleteMRByIdDto) {
    await this.canModifyMR(dto.id, dto.clinicsId);

    const data = await this.prismaService.$transaction(async (tx) => {
      const patientMR = await tx.patient_medical_records.delete({
        where: {
          id: dto.id,
        },
      });

      if (patientMR.encounterId) {
        throw new AlreadyIntegratedException();
      }

      const pharmacyTask = await this.prismaService.pharmacy_Task.deleteMany({
        where: {
          assessmentReffId: dto.id,
          status: 'Todo',
        },
      });

      return {
        patientMR,
        pharmacyTask,
      };
    });

    return data;
  }

  async canModifyMR(id: string, clinicsId: string) {
    const patientMR =
      await this.prismaService.patient_medical_records.findFirst({
        where: {
          id,
        },
        select: {
          patientId: true,
        },
      });

    await this.patientsService.canModifyPatient(patientMR.patientId, clinicsId);
  }

  private _findAllSelectFactory(): Prisma.Patient_medical_recordsFindManyArgs['select'] {
    return {
      id: true,
      visitAt: true,
      queue: true,
      Patient: true,
      status: true,
      vitalSign: true,
    };
  }
}
