import { IsNotEmpty, IsString } from 'class-validator';

export class FindPatientsByClinicsIdDto {
  @IsString()
  @IsNotEmpty()
  clinicsId: string;

  @IsString()
  search: string;
}
