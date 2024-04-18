import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsOptional()
  nik?: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsOptional()
  parentname?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  blood?: string;

  @IsDateString()
  @IsOptional()
  birthAt?: string;

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
