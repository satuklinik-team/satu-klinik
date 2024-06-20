import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';
import { DateOperation } from 'src/utils/helpers/format-date.helper';

export class FindAllMRDto extends PaginationDto {
  @IsEnum(DateOperation)
  @IsOptional()
  type?: DateOperation;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  patientId?: string;
}
