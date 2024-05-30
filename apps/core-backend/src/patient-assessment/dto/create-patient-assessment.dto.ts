import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';

class Prescription {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  medicineId: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  frequency: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  period: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  doseQuantity: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  totalQuantity: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  supplyDuration: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreatePatientAssessmentDto {
  @IsString()
  @IsNotEmpty()
  mrid: string;

  @IsString()
  @IsNotEmpty()
  subjective: string;

  @IsString()
  @IsNotEmpty()
  objective: string;

  @IsString()
  @IsNotEmpty()
  assessment: string;

  @IsString()
  @IsNotEmpty()
  plan: string;

  @IsString()
  @IsOptional()
  icd10Code?: string;

  @IsString()
  @IsOptional()
  icd9CMCode?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Prescription)
  prescriptions: Prescription[];

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  usersId?: string;
}
