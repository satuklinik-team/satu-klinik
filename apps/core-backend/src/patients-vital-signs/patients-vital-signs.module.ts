import { Module } from '@nestjs/common';
import { PatientsVitalSignsService } from './patients-vital-signs.service';
import { PatientsService } from 'src/patients/patients.service';
import { PatientsVitalSignsController } from './patients-vital-signs.controller';

@Module({
  providers: [PatientsVitalSignsService, PatientsService],
  controllers: [PatientsVitalSignsController],
})
export class PatientsVitalSignsModule {}
