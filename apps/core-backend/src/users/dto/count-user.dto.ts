import { PickType } from '@nestjs/mapped-types';
import { FindUsersDto } from './find-user.dto';

export class CountUsersDto extends PickType(FindUsersDto, ['where']) {}
