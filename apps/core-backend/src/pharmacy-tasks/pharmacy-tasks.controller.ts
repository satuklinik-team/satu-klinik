import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FindAllReturn } from 'src/utils/types';
import { FindAllPharmacyTaskDto } from './dto/find-all-pharmacy-task.dto';
import { PharmacyTasksService } from './pharmacy-tasks.service';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { FindPharmacyTaskByIdDto } from './dto/find-pharmacy-task-by-id.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';

@Controller('pharmacy-tasks')
export class PharmacyTasksController {
  constructor(private readonly pharmacyTasksService: PharmacyTasksService) {}

  @Get()
  @Roles(Role.PHARMACY)
  async findAll(
    @Query() dto: FindAllPharmacyTaskDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return await this.pharmacyTasksService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get(':id')
  @Roles(Role.PHARMACY)
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.pharmacyTasksService.findById({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Post(':id')
  @Roles(Role.PHARMACY)
  async completeTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CompleteTaskDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.pharmacyTasksService.completeTask({
      ...dto,
      id,
      clinicsId: tokenData.clinicsId,
    });
  }
}
