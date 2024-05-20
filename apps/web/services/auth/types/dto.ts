export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthRegisterDto {
  email: string;
  fullname: string;
  password: string;
  confirmPassword?: string;
  clinicName: string;
  clinicEmail: string;
  clinicPhone: string;
  clinicAddress: string;
  clinicCode?: string;
  nik: string;
}
