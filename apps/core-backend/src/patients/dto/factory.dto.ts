import { UpdatePatientDto } from './update-patient-dto';

export function createPatientData(dto: UpdatePatientDto) {
  return {
    nik: dto.nik,
    fullname: dto.fullname,
    parentname: dto.parentname,
    address: dto.address,
    phone: dto.phone,
    age: dto.age,
    sex: dto.sex,
    blood: dto.blood,
    ...(dto.birthAt && { birthAt: `${dto.birthAt}T00:00:00.000Z` }),
    clinicsId: dto.clinicsId,
  };
}
