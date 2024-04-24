import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVitalSignDto {
  @IsString()
  @IsOptional()
  patientId?: string;

  @IsInt()
  @IsOptional()
  temperature?: number;

  @IsString()
  @IsOptional()
  allergic?: string;

  @IsInt()
  @IsOptional()
  systole?: number;

  @IsInt()
  @IsOptional()
  diastole?: number;

  @IsInt()
  @IsOptional()
  height?: number;

  @IsInt()
  @IsOptional()
  weight?: number;

  @IsInt()
  @IsOptional()
  respiration?: number;

  @IsInt()
  @IsNotEmpty()
  pulse: number;
}
