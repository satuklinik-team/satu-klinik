import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  nik: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  phone: string;
}
