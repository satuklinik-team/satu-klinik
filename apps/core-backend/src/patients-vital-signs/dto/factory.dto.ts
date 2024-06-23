import { Prisma } from '@prisma/client';
import { undefinedToNull } from 'src/utils';
import { formatDate } from 'src/utils/helpers/format-date.helper';

export enum VitalSignQueryTypes {
  CREATE = 'create',
  UPDATE = 'update',
}

export function createVitalSignData(
  type: VitalSignQueryTypes,
  dto: any,
  queue?: string,
): Prisma.Patient_medical_recordsCreateArgs['data'] {
  const now = new Date();

  return {
    ...(type === VitalSignQueryTypes.CREATE && {
      patientId: dto.patientId,
      visitAt: now,
      visitLabel: formatDate(now),
      status: 'e1',
      queue,
    }),
    practitionerId: dto.usersId,
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
        sugar: dto.sugar,
        cholesterol: dto.cholesterol,
        urate: dto.urate,
        pain: dto.pain,
      },
    },
  };
}
