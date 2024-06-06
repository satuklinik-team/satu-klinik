import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVitalSignDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  temperature: number;

  @IsString()
  @IsNotEmpty()
  allergic: string;

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
  @IsOptional()
  height?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  weight?: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  respiration: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  pulse: number;

  @IsString()
  @IsNotEmpty()
  pain: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  usersId?: string;
}
