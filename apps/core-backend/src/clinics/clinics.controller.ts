import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  Res,
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';
import { Response } from 'express';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async findAll(
    @Query() dto: FindAllClinicsDto,
    @TokenData() tokenData: JwtPayload,
    @Res() res: Response,
  ) {
    const { data, total } = await this.clinicsService.findAll({
      usersId: tokenData.sub,
      ...dto,
    });

    if (dto.count) {
      res.header('x-data-count', total.toString());
    }

    return res.json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClinicDto) {
    return this.clinicsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicsService.remove(id);
  }
}
