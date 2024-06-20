import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DateOperation } from 'src/utils/helpers/format-date.helper';

export class GetMRChartDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsEnum(DateOperation)
  @IsNotEmpty()
  type: DateOperation;
}
