import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class PaginationDto {
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
  count = false;
}
