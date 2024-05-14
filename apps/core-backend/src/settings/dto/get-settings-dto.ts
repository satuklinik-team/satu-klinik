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

export class GetSettingsDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;
}
