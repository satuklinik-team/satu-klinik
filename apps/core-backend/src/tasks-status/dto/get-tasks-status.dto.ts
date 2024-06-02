import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';

export enum GetTasksStatusTypes {
  GENERAL = 'GENERAL',
  DOCTOR = 'DOCTOR',
  PHARMACY = 'PHARMACY',
}

export class GetTasksStatusDto {
  @IsEnum(GetTasksStatusTypes)
  @IsOptional()
  type: GetTasksStatusTypes = GetTasksStatusTypes.GENERAL;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  role?: Role;
}
