import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { JwtPayload } from 'src/auth/types';
import { PaginationDto } from 'src/utils/classes';
import { GetMRByIdDto } from './get-mr-by-id.dto';

export class DeleteMRByIdDto extends GetMRByIdDto {}
