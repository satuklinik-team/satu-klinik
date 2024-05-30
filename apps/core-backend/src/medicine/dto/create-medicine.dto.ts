import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto';
import { BufferedFile } from 'src/minio-client/model/file.model';

export class CreateMedicineDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  discount?: number;

  image?: BufferedFile;

  @IsString()
  @IsOptional()
  clinicsId?: string;

  @IsString()
  @IsOptional()
  kfaCode?: string;
}
