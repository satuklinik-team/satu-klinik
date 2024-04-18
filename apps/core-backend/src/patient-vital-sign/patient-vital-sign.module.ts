import { Module } from '@nestjs/common';
import { PatientVitalSignService } from './patient-vital-sign.service';
import { PatientService } from 'src/patient/patient.service';

@Module({
  providers: [PatientVitalSignService, PatientService],
})
export class PatientVitalSignModule {}
