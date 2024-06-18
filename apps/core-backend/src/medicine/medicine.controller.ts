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
import { FindAllReturn } from 'src/utils/types';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post('')
  @Roles(Role.PHARMACY)
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
      usersId: tokenData.sub,
    });
  }

  @Patch(':id')
  @Roles(Role.PHARMACY)
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
      usersId: tokenData.sub,
    });
  }

  @Get('')
  @Roles(Role.PHARMACY, Role.DOCTOR)
  async findAll(
    @Query() dto: FindAllIMedicineDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return await this.medicineService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get('category/:categoryId')
  @Roles(Role.PHARMACY)
  async findMedicinesByCategory(
    @Query() dto: FindAllIMedicineDto,
    @TokenData() tokenData: JwtPayload,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<FindAllReturn<object>> {
    return await this.medicineService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
      categoryId,
    });
  }

  @Get(':id')
  @Roles(Role.PHARMACY)
  async findMedicineById(
    @TokenData() tokenData: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.medicineService.findById({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Delete(':id')
  @Roles(Role.PHARMACY)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.medicineService.delete({
      id,
      clinicsId: tokenData.clinicsId,
      usersId: tokenData.sub,
    });
  }
}
