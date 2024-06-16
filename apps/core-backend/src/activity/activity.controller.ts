import { Controller, Get, Query } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtPayload } from 'src/auth/types';
import { FindAllClinicsDto } from 'src/clinics/dto/find-all-clinics-dto';
import { TokenData } from 'src/utils';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { FindAllReturn } from 'src/utils/types';
import { ActivityService } from './activity.service';
import { FindAllActivityDto } from './dto/find-all-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async findAll(
    @Query() dto: FindAllActivityDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return await this.activityService.findAll({
      clinicsId: tokenData.clinicsId,
      ...dto,
    });
  }
}
