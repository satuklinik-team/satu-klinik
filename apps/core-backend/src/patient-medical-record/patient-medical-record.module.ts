import { Module } from '@nestjs/common';
import { PatientMedicalRecordController } from './patient-medical-record.controller';
import { PatientMedicalRecordService } from './patient-medical-record.service';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [PatientsModule],
  controllers: [PatientMedicalRecordController],
  providers: [PatientMedicalRecordService],
  exports: [PatientMedicalRecordService],
})
export class PatientMedicalRecordModule {}
