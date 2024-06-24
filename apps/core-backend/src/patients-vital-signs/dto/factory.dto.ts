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
        height: undefinedToNull(dto.height),
        weight: undefinedToNull(dto.weight),
        allergic: dto.allergic,
        systole: dto.systole,
        diastole: dto.diastole,
        pulse: dto.pulse,
        respiration: dto.respiration,
        temperature: dto.temperature,
        sugar: undefinedToNull(dto.sugar),
        cholesterol: undefinedToNull(dto.cholesterol),
        urate: undefinedToNull(dto.urate),
        pain: dto.pain,
      },
    },
  };
}
