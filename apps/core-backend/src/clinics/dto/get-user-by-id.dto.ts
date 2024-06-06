import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/users/dto';

export class GetUserByIdDto {
  @IsString()
  @IsOptional()
  usersId?: string;

  @IsString()
  @IsOptional()
  clinicsId: string;
}
