import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllClinicsDto extends PaginationDto {
  @IsString()
  @IsOptional()
  usersId?: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
