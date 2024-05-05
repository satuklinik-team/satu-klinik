import { Module } from '@nestjs/common';
import { PatientsVitalSignsService } from 'src/patients-vital-signs/patients-vital-signs.service';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PatientsVitalSignsService],
  exports: [PatientsService],
})
export class PatientsModule {}
