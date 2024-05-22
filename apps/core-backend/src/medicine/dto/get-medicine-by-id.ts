import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto';
import { BufferedFile } from 'src/minio-client/model/file.model';

export class GetMedicineByIdDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  clinicsId: string;
}
