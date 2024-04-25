import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RegisterDto } from 'src/auth/dto';
import { OrganizationAddress } from 'src/satusehat-organization/dto';

export class CreateClinicDto extends RegisterDto {
  @IsString()
  @IsNotEmpty()
  accountsId: string;
}
