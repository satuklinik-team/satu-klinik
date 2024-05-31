import { Controller, Get, Query } from '@nestjs/common';
import { TasksService } from './tasks-status.service';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetTasksStatusDto } from './dto/get-tasks-status.dto';

@Controller('tasks-status')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Roles(Role.DOCTOR, Role.PHARMACY)
  get(@Query() dto: GetTasksStatusDto, @TokenData() tokenData: JwtPayload) {
    return this.tasksService.get({
      ...dto,
      clinicsId: tokenData.clinicsId,
      role: tokenData.role,
    });
  }

  @Get('notification')
  @Roles(Role.DOCTOR, Role.PHARMACY)
  getNotification(@TokenData() tokenData: JwtPayload) {
    return this.tasksService.getNotification({
      clinicsId: tokenData.clinicsId,
      role: tokenData.role,
    });
  }
}
