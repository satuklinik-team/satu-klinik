import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllPatientsDto extends PaginationDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
