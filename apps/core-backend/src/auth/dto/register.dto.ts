import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto';

export class RegisterDto extends CreateUserDto {
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
