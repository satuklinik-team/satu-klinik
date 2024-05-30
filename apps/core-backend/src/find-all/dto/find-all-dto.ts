import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllDto extends PaginationDto {
  @IsNotEmpty()
  table: any;

  @IsOptional()
  where?: any;

  @IsOptional()
  select?: any;

  @IsOptional()
  orderBy?: any;
}
