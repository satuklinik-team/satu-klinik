import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteMedicineCategoryDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  usersId?: string;
}
