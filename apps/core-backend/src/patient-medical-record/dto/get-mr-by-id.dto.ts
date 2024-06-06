import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';

export class GetMRByIdDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  clinicsId?: string;
}
