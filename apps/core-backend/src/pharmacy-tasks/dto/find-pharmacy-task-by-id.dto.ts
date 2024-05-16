import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';

export class FindPharmacyTaskByIdDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
