import { Module } from '@nestjs/common';
import { PatientsVitalSignService } from './patients-vital-sign.service';
import { PatientsService } from 'src/patients/patients.service';

@Module({
  providers: [PatientsVitalSignService, PatientsService],
})
export class PatientsVitalSignModule {}
