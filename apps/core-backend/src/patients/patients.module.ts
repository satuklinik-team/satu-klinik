import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientsVitalSignsService } from 'src/patients-vital-signs/patients-vital-signs.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PatientsVitalSignsService],
})
export class PatientsModule {}
