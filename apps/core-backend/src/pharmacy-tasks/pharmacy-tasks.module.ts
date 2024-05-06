import { Module } from '@nestjs/common';
import { PharmacyTasksController } from './pharmacy-tasks.controller';
import { PharmacyTasksService } from './pharmacy-tasks.service';
import { FindAllModule } from 'src/find-all/find-all.module';

@Module({
  imports: [FindAllModule],
  controllers: [PharmacyTasksController],
  providers: [PharmacyTasksService],
})
export class PharmacyTasksModule {}
