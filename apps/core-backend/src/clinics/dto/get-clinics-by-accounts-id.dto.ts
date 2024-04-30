import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetClinicsByAccountsId {
  @IsString()
  @IsNotEmpty()
  usersId: string;

  @IsNumber()
  @IsNotEmpty()
  skip: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number;
}
