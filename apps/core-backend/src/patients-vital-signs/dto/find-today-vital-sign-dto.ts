import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindTodayVitalSignDto extends PaginationDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;
}
