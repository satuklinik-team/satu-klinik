import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { SatusehatOrganizationModule } from 'src/satusehat-organization/satusehat-organization.module';

@Module({
  controllers: [ClinicsController],
  providers: [ClinicsService],
  imports: [SatusehatOrganizationModule],
})
export class ClinicsModule {}
