import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';

export class GetPatientByIdDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
