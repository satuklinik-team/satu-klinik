import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum FindAllPatientTypes {
  ALL = 'ALL',
  ENTRY = 'ENTRY',
  DOCTOR = 'DOCTOR',
  PHARMACY = 'PHARMACY',
}

export class FindAllPatientsDto {
  @IsString()
  @IsNotEmpty()
  clinicsId: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(FindAllPatientTypes)
  @IsOptional()
  type: FindAllPatientTypes = FindAllPatientTypes.ALL;

  @IsNumber()
  @IsOptional()
  skip = 0;

  @IsNumber()
  @IsOptional()
  limit = 50;
}
