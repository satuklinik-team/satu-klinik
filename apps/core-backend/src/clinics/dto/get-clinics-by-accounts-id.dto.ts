import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetClinicsByAccountsId {
  @IsString()
  @IsNotEmpty()
  usersId: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  pageSize: number;
}
