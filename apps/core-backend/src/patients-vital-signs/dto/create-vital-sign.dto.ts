import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';

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
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  weight: number;

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
}
