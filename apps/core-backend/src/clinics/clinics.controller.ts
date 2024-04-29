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
  findAll(
    @Query('skip') skip = 0,
    @Query('limit') limit = 50,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.clinicsService.findAll({
      usersId: tokenData.sub,
      skip,
      limit,
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
