import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export enum FindAllPatientTypes {
  ALL = 'ALL',
  ENTRY = 'ENTRY',
  DOCTOR = 'DOCTOR',
  PHARMACY = 'PHARMACY',
}

export class FindAllPatientsDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  clinicsId: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(FindAllPatientTypes)
  @IsOptional()
  type: FindAllPatientTypes = FindAllPatientTypes.ALL;
}
