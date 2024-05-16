import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MedicineCategoryService } from './medicine-category.service';
import { CreateMedicineCategoryDto } from './dto/create-medicine-category.dto';
import { UpdateMedicineCategoryDto } from './dto/update-medicine-category.dto';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';

@Controller('medicine-category')
export class MedicineCategoryController {
  constructor(
    private readonly medicineCategoryService: MedicineCategoryService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateMedicineCategoryDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.medicineCategoryService.create({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get()
  findAll(@TokenData() tokenData: JwtPayload) {
    return this.medicineCategoryService.findAll(tokenData.clinicsId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMedicineCategoryDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.medicineCategoryService.update({
      ...dto,
      id,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.medicineCategoryService.remove({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }
}
