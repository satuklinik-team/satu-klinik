import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';

export class FindAllPatientAssessmentDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
