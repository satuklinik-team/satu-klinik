import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllMedicineCategoriesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;
}
