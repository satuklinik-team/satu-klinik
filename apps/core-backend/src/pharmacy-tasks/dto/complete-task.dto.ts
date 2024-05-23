import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';

export class CompleteTaskDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  usersId?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty({ each: true })
  @Type(() => Number)
  boughtPrescriptionsId: number[];
}
