import { Module } from '@nestjs/common';
import { PharmacyTasksController } from './pharmacy-tasks.controller';
import { PharmacyTasksService } from './pharmacy-tasks.service';

@Module({
  controllers: [PharmacyTasksController],
  providers: [PharmacyTasksService],
})
export class PharmacyTasksModule {}
