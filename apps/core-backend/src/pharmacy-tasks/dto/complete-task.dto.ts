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

class NotBought {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}

export class CompleteTaskDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotBought)
  notBought: NotBought[];
}
