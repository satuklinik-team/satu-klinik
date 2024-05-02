import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Prescription {
  @IsString()
  @IsNotEmpty()
  medicine: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsOptional()
  usage?: string;
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
}
