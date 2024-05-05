import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';

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

  @IsOptional()
  tokenData?: JwtPayload;
}
