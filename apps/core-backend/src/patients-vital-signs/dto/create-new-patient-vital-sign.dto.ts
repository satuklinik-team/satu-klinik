import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';

export class CreateNewPatientVitalSignDto extends CreatePatientDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  height?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  weight?: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  systole: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  diastole: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  respiration: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  pulse: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  sugar?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  cholesterol?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  urate?: number;

  @IsString()
  @IsNotEmpty()
  allergic: string;

  @IsString()
  @IsNotEmpty()
  pain: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  usersId?: string;

  @IsString()
  @IsOptional()
  patientId?: string;
}
