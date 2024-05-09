import { Controller, Get, Query, Res } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';
import { FindAllReturn } from 'src/utils/types';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async findAll(
    @Query() dto: FindAllClinicsDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    const { data, count } = await this.clinicsService.findAll({
      usersId: tokenData.sub,
      clinicsId: tokenData.clinicsId,
      ...dto,
    });

    return { data, count };
  }
}
