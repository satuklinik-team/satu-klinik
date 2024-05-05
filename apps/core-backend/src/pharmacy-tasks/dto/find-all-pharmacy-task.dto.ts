import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';

export class FindAllPharmacyTaskDto extends PaginationDto {
  @IsOptional()
  tokenData?: JwtPayload;
}
