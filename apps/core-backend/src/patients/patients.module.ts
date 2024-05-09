import { Module } from '@nestjs/common';
import { PatientsVitalSignsService } from 'src/patients-vital-signs/patients-vital-signs.service';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { FindAllModule } from 'src/find-all/find-all.module';
import { FindAllService } from 'src/find-all/find-all.service';

@Module({
  imports: [FindAllModule],
  controllers: [PatientsController],
  providers: [PatientsService, PatientsVitalSignsService],
  exports: [PatientsService],
})
export class PatientsModule {}
