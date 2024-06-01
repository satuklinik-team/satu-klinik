export interface CreatePatientDto {
  nik: string;
  fullname: string;
  address: string;
  sex: string;
  blood: string;
  phone: string;
  birthAt: string;
}

export type UpdatePatientDto = Partial<CreatePatientDto>;
