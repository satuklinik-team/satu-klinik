import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreatePatientDto } from './create-patient.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsString()
  @IsOptional()
  id?: string;
}
