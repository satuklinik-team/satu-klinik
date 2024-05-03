import { IsString, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/utils/classes';

export class FindAllPatientAssessmentDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;
}
