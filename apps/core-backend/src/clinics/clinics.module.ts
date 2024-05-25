import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { FindAllModule } from 'src/find-all/find-all.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ClinicsController],
  providers: [ClinicsService],
  imports: [FindAllModule, UsersModule],
  exports: [ClinicsService],
})
export class ClinicsModule {}
