import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  nik: string;

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
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  blood: string;

  @IsDateString()
  @IsNotEmpty()
  birthAt: string;

  @IsUUID()
  @IsNotEmpty()
  clinicsId: string;
}
