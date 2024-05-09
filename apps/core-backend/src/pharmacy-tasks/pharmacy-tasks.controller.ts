import {
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

  @Post(':id')
  @Roles(Role.PHARMACY)
  async completeTask(
    @Param('id') id: number,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.pharmacyTasksService.completeTask({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }
}
