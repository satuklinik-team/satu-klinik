import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class IncreaseRevenueDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  value: number;

  @IsString()
  @IsNotEmpty()
  clinicsId: string;
}
