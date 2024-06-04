import { Module } from '@nestjs/common';
import { PatientMedicalRecordController } from './patient-medical-record.controller';
import { PatientMedicalRecordService } from './patient-medical-record.service';

@Module({
  controllers: [PatientMedicalRecordController],
  providers: [PatientMedicalRecordService]
})
export class PatientMedicalRecordModule {}
