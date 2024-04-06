import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class OrganizationTelecom {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  url?: string;
}

export class OrganizationAddressExtension {
  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  village: string;
}

export class OrganizationAddress {
  @IsString()
  @IsNotEmpty()
  line: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @Type(() => OrganizationAddressExtension)
  @IsObject()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  ext: OrganizationAddressExtension;
}

export class CreateOrganizationDto {
  @IsIn(['prov', 'dept'])
  @IsNotEmpty()
  @IsString()
  type: 'prov' | 'dept';

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @Type(() => OrganizationAddress)
  @ValidateNested({ each: true })
  address: OrganizationAddress;

  @IsObject()
  @Type(() => OrganizationTelecom)
  @ValidateNested({ each: true })
  telecom: OrganizationTelecom;
}
