import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  license?: string;

  @IsString()
  @IsOptional()
  fasyankesId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  serviceFee?: number;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
