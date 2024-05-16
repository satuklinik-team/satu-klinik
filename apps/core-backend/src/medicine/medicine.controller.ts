import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MedicineCategoryService } from 'src/medicine-category/medicine-category.service';
import { BufferedFile } from 'src/minio-client/model/file.model';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { FindAllIMedicineDto } from './dto/find-all-medicine-dto';
import { UpdateMedicineDto } from './dto/update-medicine-dto';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateMedicineDto,
    @UploadedFile() image: BufferedFile,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.image = image;
    return await this.medicineService.create({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMedicineDto,
    @UploadedFile() image: BufferedFile,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.id = id;
    dto.image = image;
    return await this.medicineService.update({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get('')
  async findAll(
    @Query() dto: FindAllIMedicineDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.medicineService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get(':categoryId')
  async findMedicinesByCategory(
    @Query() dto: FindAllIMedicineDto,
    @TokenData() tokenData: JwtPayload,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.medicineService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
      categoryId,
    });
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.medicineService.delete({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }
}
