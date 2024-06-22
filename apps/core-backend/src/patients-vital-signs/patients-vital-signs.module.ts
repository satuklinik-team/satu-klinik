import { Module } from '@nestjs/common';
import { PatientsVitalSignsService } from './patients-vital-signs.service';
import { PatientsService } from 'src/patients/patients.service';
import { PatientsVitalSignsController } from './patients-vital-signs.controller';
import { PatientsModule } from 'src/patients/patients.module';
import { PatientMedicalRecordModule } from 'src/patient-medical-record/patient-medical-record.module';

@Module({
  imports: [PatientsModule, PatientMedicalRecordModule],
  providers: [PatientsVitalSignsService],
  controllers: [PatientsVitalSignsController],
})
export class PatientsVitalSignsModule {}
