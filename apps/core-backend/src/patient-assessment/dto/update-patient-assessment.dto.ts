import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePatientAssessmentDto } from './create-patient-assessment.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdatePatientAssessmentDto extends PartialType(
  OmitType(CreatePatientAssessmentDto, ['prescriptions'] as const),
) {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;
}
