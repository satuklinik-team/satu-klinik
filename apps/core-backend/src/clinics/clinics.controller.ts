import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  findAll() {
    return this.clinicsService.findAll();
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
