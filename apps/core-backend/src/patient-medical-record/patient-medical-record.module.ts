import { Module } from '@nestjs/common';
import { PatientMedicalRecordController } from './patient-medical-record.controller';
import { PatientMedicalRecordService } from './patient-medical-record.service';
import { FindAllModule } from 'src/find-all/find-all.module';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [FindAllModule, PatientsModule],
  controllers: [PatientMedicalRecordController],
  providers: [PatientMedicalRecordService],
})
export class PatientMedicalRecordModule {}
