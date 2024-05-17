import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllICD10Dto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;
}
