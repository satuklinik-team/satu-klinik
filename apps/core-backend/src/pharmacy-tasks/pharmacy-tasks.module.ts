import { Module } from '@nestjs/common';
import { PharmacyTasksController } from './pharmacy-tasks.controller';
import { PharmacyTasksService } from './pharmacy-tasks.service';
import { RevenueModule } from 'src/revenue/revenue.module';

@Module({
  imports: [RevenueModule],
  controllers: [PharmacyTasksController],
  providers: [PharmacyTasksService],
})
export class PharmacyTasksModule {}
