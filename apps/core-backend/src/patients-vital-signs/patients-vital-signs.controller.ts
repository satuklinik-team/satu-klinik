import { Body, Controller, Post } from '@nestjs/common';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { PatientsVitalSignsService } from './patients-vital-signs.service';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { CreateNewPatientVitalSignDto } from './dto/create-new-patient-vital-sign.dto';

@Controller('patients-vital-signs')
export class PatientsVitalSignsController {
  constructor(
    private readonly patientVitalSignService: PatientsVitalSignsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  createExistingPatientVitalSign(
    @Body() dto: CreateVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientVitalSignService.create({
      ...dto,
      clinicsId: tokenData.clinicsId,
      usersId: tokenData.sub,
    });
  }

  @Post('new-patient')
  @Roles(Role.ADMIN)
  createNewPatientVitalSign(
    @Body() dto: CreateNewPatientVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientVitalSignService.create({
      ...dto,
      clinicsId: tokenData.clinicsId,
      usersId: tokenData.sub,
      patientId: null,
    });
  }
}
