import { IsNotEmpty, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto';

export class CreateClinicDto extends RegisterDto {
  @IsString()
  @IsNotEmpty()
  accountsId: string;
}
