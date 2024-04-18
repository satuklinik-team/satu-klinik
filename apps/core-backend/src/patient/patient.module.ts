import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientVitalSignService } from 'src/patient-vital-sign/patient-vital-sign.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PatientVitalSignService],
})
export class PatientModule {}
