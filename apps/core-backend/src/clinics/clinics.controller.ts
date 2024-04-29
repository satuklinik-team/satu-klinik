import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get('')
  getClinicsByUsersId(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @TokenData() tokenData: JwtPayload,
  ) {
    const pageNum = parseInt(page, 10);
    const pageSizeNum = parseInt(pageSize, 10);
    return this.clinicsService.getClinicsByUsersId({
      usersId: tokenData.sub,
      page: pageNum,
      pageSize: pageSizeNum,
    });
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
