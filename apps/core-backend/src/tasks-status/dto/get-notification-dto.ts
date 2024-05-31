import { Role } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class GetNotificationDto {
  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  role?: Role;
}
