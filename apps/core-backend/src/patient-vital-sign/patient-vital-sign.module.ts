import { Module } from '@nestjs/common';
import { PatientVitalSignService } from './patient-vital-sign.service';

@Module({
  providers: [PatientVitalSignService],
})
export class PatientVitalSignModule {}
