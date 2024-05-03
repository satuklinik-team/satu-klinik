import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class FindAllPatientAssessmentDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  skip = 0;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  limit = 50;

  @IsBoolean()
  @Type(() => Boolean)
  @IsNotEmpty()
  count = true;
}
