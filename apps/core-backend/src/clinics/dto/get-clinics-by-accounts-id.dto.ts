import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetClinicsByAccountsId {
  @IsString()
  @IsNotEmpty()
  usersId: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  skip = 0;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  limit = 50;

  @IsBoolean()
  @Type(() => Boolean)
  @IsNotEmpty()
  count: boolean;
}
