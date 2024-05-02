import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllICD9CMDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skip = 0;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit = 50;
}
