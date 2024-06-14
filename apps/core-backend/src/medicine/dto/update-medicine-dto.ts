import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto';
import { BufferedFile } from 'src/minio-client/model/file.model';
import { CreateMedicineDto } from './create-medicine.dto';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;
}
