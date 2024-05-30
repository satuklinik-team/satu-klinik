import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { SatusehatOrganizationModule } from 'src/satusehat-organization/satusehat-organization.module';
import { FindAllModule } from 'src/find-all/find-all.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ClinicsController],
  providers: [ClinicsService],
  imports: [SatusehatOrganizationModule, FindAllModule, UsersModule],
  exports: [ClinicsService],
})
export class ClinicsModule {}
