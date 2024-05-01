import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetClinicsByAccountsId {
  @IsString()
  @IsNotEmpty()
  usersId: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  skip: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  limit: number;
}
