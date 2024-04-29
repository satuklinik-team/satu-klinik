import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsNotEmpty()
  clinicName: string;

  @IsString()
  @IsNotEmpty()
  clinicEmail: string;

  @IsString()
  @IsNotEmpty()
  clinicPhone: string;

  @IsString()
  @IsNotEmpty()
  clinicAddress: string;
}
