import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrganizationAddress } from 'src/satusehat-organization/dto';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  url?: string;

  @IsString()
  @IsObject()
  @Type(() => OrganizationAddress)
  @ValidateNested({ each: true })
  addressDetail: OrganizationAddress;
}
