import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto';
import { BufferedFile } from 'src/minio-client/model/file.model';

export class DeleteMedicineDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  usersId?: string;
}
