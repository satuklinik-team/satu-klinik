import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicineCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
