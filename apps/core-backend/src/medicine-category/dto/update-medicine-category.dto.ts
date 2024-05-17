import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineCategoryDto } from './create-medicine-category.dto';
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMedicineCategoryDto extends CreateMedicineCategoryDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;
}
