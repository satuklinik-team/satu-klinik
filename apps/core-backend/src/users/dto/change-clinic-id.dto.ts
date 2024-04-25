import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeClinicIdDto {
  @IsString()
  @IsNotEmpty()
  usersId: string;

  @IsString()
  @IsNotEmpty()
  clinicsId: string;
}
