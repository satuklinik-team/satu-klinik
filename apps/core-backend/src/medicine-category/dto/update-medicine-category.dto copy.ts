import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCategoryByIdDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
