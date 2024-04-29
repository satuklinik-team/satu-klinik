import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientsVitalSignService } from 'src/patients-vital-sign/patients-vital-sign.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PatientsVitalSignService],
})
export class PatientsModule {}
