import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllICD9CMDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;
}
