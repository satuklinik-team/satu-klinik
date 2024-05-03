import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { PatientsVitalSignsService } from './patients-vital-signs.service';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';

@Controller('patients-vital-signs')
export class PatientsVitalSignsController {
  constructor(
    private readonly patientVitalSignService: PatientsVitalSignsService,
  ) {}

  @Post()
  createVitalSign(
    @Body() dto: CreateVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientVitalSignService.create({
      usersId: tokenData.sub,
      ...dto,
    });
  }
}
