import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateClinicCredsDto {
  @IsString()
  @IsOptional()
  clientId?: string;

  @IsString()
  @IsOptional()
  clientSecret?: string;

  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsString()
  @IsOptional()
  locationSatuSehatId?: string;

  @IsString()
  @IsOptional()
  locationName?: string;

  @IsString()
  @IsNotEmpty()
  clinicsId?: string;
}
