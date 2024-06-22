import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateNewPatientVitalSignDto } from './create-new-patient-vital-sign.dto';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';
import { CreateVitalSignDto } from './create-vital-sign.dto';

export class UpdateVitalSignDto extends PartialType(CreateVitalSignDto) {
  @IsString()
  @IsNotEmpty()
  mrid: string;
}
