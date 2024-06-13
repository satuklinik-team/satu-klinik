import { Module } from '@nestjs/common';
import { PatientsVitalSignsService } from './patients-vital-signs.service';
import { PatientsService } from 'src/patients/patients.service';
import { PatientsVitalSignsController } from './patients-vital-signs.controller';
import { FindAllModule } from 'src/find-all/find-all.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [FindAllModule],
  providers: [PatientsVitalSignsService, PatientsService],
  controllers: [PatientsVitalSignsController],
})
export class PatientsVitalSignsModule {}
