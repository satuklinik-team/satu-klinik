import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto';

export class UpdateClinicUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}
