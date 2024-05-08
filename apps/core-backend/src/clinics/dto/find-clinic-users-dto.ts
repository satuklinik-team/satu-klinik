import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindClinicUsersDto extends PaginationDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;
}
