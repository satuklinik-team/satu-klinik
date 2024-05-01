import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateVitalSignDto {
  @IsString()
  @IsOptional()
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

  @IsUUID()
  @IsNotEmpty()
  clinicsId: string;

  @IsString()
  @IsOptional()
  usersId?: string;
}
