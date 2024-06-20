import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllVitalSignDto extends PaginationDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;
}
