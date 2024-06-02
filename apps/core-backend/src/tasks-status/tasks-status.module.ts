import { Module } from '@nestjs/common';
import { TasksController } from './tasks-status.controller';
import { TasksService } from './tasks-status.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
