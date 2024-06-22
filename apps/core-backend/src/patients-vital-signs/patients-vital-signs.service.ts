import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { PatientAlreadyRegistedException } from 'src/exceptions/conflict/patient-already-registered.exception';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { CreateVitalSignDto } from 'src/patients-vital-signs/dto/create-vital-sign.dto';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatDate } from 'src/utils/helpers/format-date.helper';
import { ServiceContext } from 'src/utils/types';
import { VitalSignQueryTypes, createVitalSignData } from './dto/factory.dto';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityTitles } from 'src/activity/dto/activity.dto';
import { CreateNewPatientVitalSignDto } from './dto/create-new-patient-vital-sign.dto';
import { FindAllService } from 'src/find-all/find-all.service';
import { FindTodayVitalSignDto } from './dto/find-today-vital-sign-dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';
import { exclude } from 'src/utils';
import { PatientMedicalRecordService } from 'src/patient-medical-record/patient-medical-record.service';

@Injectable()
export class PatientsVitalSignsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientService: PatientsService,
    private readonly patientMedicalRecordService: PatientMedicalRecordService,
    private readonly activityService: ActivityService,
    private readonly findAllService: FindAllService,
  ) {}

  async findTodayVitalSign(dto: FindTodayVitalSignDto) {
    const args: Prisma.Patient_medical_recordsFindManyArgs = {
      where: {
        Patient: {
          clinicsId: dto.clinicsId,
        },
        visitLabel: formatDate(new Date()),
        status: 'e1',
      },
      include: {
        Patient: true,
        vitalSign: true,
      },
      orderBy: {
        visitAt: 'desc',
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.patient_medical_records,
      ...args,
      ...dto,
    });
  }

  async create(dto: CreateVitalSignDto | CreateNewPatientVitalSignDto) {
    if (dto instanceof CreateVitalSignDto) {
      await this.patientService.canModifyPatient(dto.patientId, dto.clinicsId);
    }

    const data = await this.prismaService.$transaction(async (tx) => {
      let patient: any;
      if (dto instanceof CreateNewPatientVitalSignDto) {
        patient = await this.patientService.create(dto, { tx });
        dto.patientId = patient.id;
      } else if (dto.changePatientDetail) {
        patient = await this.patientService.updatePatientById(
          {
            id: dto.patientId,
            ...dto,
          },
          { tx },
        );
      }

      const latestMR = await tx.patient_medical_records.findFirst({
        where: {
          patientId: dto.patientId,
        },
        orderBy: {
          visitAt: 'desc',
        },
      });
      const today = formatDate(new Date());
      if (latestMR?.status === 'e1' && latestMR.visitLabel === today) {
        throw new PatientAlreadyRegistedException();
      }

      const queue = await this._getQueueNo(dto.clinicsId, { tx });

      const newVitalSign = createVitalSignData(
        VitalSignQueryTypes.CREATE,
        dto,
        queue,
      );
      const data = await tx.patient_medical_records.create({
        data: newVitalSign,
        select: {
          id: true,
          status: true,
          queue: true,
          visitAt: true,
          visitLabel: true,
          vitalSign: { take: 1 },
        },
      });

      this.activityService.emit({
        title: ActivityTitles.PATIENT_REGISTRATION,
        clinicsId: dto.clinicsId,
        usersId: dto.usersId,
        payload: newVitalSign,
      });

      const result = {
        ...data,
        visitAt: data.visitAt.toLocaleString('en-GB'),
      };

      if (dto instanceof CreateVitalSignDto && !dto.changePatientDetail) {
        return result;
      }
      return {
        patient,
        patientMedicalRecord: result,
      };
    });

    return data;
  }

  async update(dto: UpdateVitalSignDto) {
    await this.patientMedicalRecordService.canModifyMR(dto.mrid, dto.clinicsId);

    const updateVitalSign = createVitalSignData(
      VitalSignQueryTypes.UPDATE,
      dto,
    );

    const data = await this.prismaService.$transaction(async (tx) => {
      if (dto.changePatientDetail) {
        await this.patientService.updatePatientById(
          {
            id: dto.patientId,
            ...dto,
          },
          { tx },
        );
      }

      const mr = await tx.patient_medical_records.update({
        where: {
          id: dto.mrid,
        },
        data: {
          practitionerId: dto.usersId,
        },
        select: {
          id: true,
          status: true,
          queue: true,
          visitAt: true,
          visitLabel: true,
          vitalSign: { take: 1 },
        },
      });

      const result = {
        ...mr,
        visitAt: mr.visitAt.toLocaleString('en-GB'),
      };

      const vitalSign = await tx.patient_vital_sign.updateMany({
        where: {
          patient_medical_recordsId: dto.mrid,
        },
        data: updateVitalSign.vitalSign.create,
      });

      this.activityService.emit({
        title: ActivityTitles.UPDATE_PATIENT_REGISTRATION,
        clinicsId: dto.clinicsId,
        usersId: dto.usersId,
        payload: updateVitalSign.vitalSign.create,
      });

      return dto.changePatientDetail ? result : vitalSign;
    });

    return data;
  }

  async _getQueueNo(clinicsId: string, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);

    const result = await prisma.departments.findFirst({
      where: {
        clinicsId,
        name: 'main',
      },
      select: {
        id: true,
        counter: true,
        currentDate: true,
      },
    });

    const { id } = result;
    let { counter, currentDate } = result;

    const today = formatDate(new Date());
    if (today !== currentDate) {
      currentDate = today;
      counter = 0;
    }
    counter += 1;

    const department = await prisma.departments.update({
      where: {
        id,
      },
      data: {
        currentDate,
        counter,
      },
      select: { alias: true },
    });

    return `${department.alias}-${counter}`;
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
