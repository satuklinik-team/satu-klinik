import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { PatientsVitalSignsService } from './patients-vital-signs.service';

@Controller('patients-vital-signs')
export class PatientsVitalSignsController {
  constructor(
    private readonly patientVitalSignService: PatientsVitalSignsService,
  ) {}

  @Post(':id')
  createVitalSign(@Param('id') id: string, @Body() dto: CreateVitalSignDto) {
    dto.patientId = id;
    return this.patientVitalSignService.create(dto);
  }
}
