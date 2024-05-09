import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';

export class CreateVitalSignDto {
  @IsString()
  @IsNotEmpty()
  patientId?: string;

  @IsInt()
  @IsNotEmpty()
  temperature: number;

  @IsString()
  @IsNotEmpty()
  allergic: string;

  @IsInt()
  @IsNotEmpty()
  systole: number;

  @IsInt()
  @IsNotEmpty()
  diastole: number;

  @IsInt()
  @IsNotEmpty()
  height: number;

  @IsInt()
  @IsNotEmpty()
  weight: number;

  @IsInt()
  @IsNotEmpty()
  respiration: number;

  @IsInt()
  @IsNotEmpty()
  pulse: number;

  @IsString()
  @IsNotEmpty()
  pain: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
