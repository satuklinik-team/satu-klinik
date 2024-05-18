import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';

export class EncounterJsonDto {
  @IsString()
  @IsNotEmpty()
  clinicsId: string;

  @IsString()
  @IsNotEmpty()
  mrid: string;

  @IsString()
  @IsNotEmpty()
  patientSatuSehatId: string;

  @IsDateString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  practitionerId: string;

  @IsString()
  @IsNotEmpty()
  practitionerName: string;
}
