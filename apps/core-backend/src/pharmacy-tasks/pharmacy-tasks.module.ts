import { Module } from '@nestjs/common';
import { PharmacyTasksController } from './pharmacy-tasks.controller';
import { PharmacyTasksService } from './pharmacy-tasks.service';
import { FindAllModule } from 'src/find-all/find-all.module';
import { RevenueModule } from 'src/revenue/revenue.module';

@Module({
  imports: [FindAllModule, RevenueModule],
  controllers: [PharmacyTasksController],
  providers: [PharmacyTasksService],
})
export class PharmacyTasksModule {}
