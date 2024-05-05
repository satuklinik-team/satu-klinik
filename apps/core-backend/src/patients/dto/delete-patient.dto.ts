import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';

export class DeletePatientDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  tokenData: JwtPayload;
}