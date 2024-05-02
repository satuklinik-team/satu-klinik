import { Controller, Get, Query, Res } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';
import { Response } from 'express';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async findAll(
    @Query() dto: FindAllClinicsDto,
    @TokenData() tokenData: JwtPayload,
    @Res() res: Response,
  ) {
    const { data, total } = await this.clinicsService.findAll({
      usersId: tokenData.sub,
      ...dto,
    });

    if (dto.count) {
      res.header('x-data-count', total.toString());
    }

    return res.json(data);
  }
}
