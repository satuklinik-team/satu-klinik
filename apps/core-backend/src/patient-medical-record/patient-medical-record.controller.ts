import { Body, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PatientMedicalRecordService } from './patient-medical-record.service';
import { FindAllMRDto } from './dto/find-all-mr.dto';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { FindAllReturn } from 'src/utils/types';
import { GetMRByIdDto } from './dto/get-mr-by-id.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('patient-medical-record')
export class PatientMedicalRecordController {
  constructor(
    private readonly patientMedicalRecordService: PatientMedicalRecordService,
  ) {}

  @Get()
  @Roles(Role.DOCTOR)
  async findAll(
    @Query() dto: FindAllMRDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return this.patientMedicalRecordService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get(':id')
  @Roles(Role.DOCTOR)
  async getById(@Param('id') id: string, @TokenData() tokenData: JwtPayload) {
    return this.patientMedicalRecordService.getById({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Delete(':id')
  @Roles(Role.DOCTOR)
  async deleteById(
    @Param('id') id: string,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientMedicalRecordService.deleteById({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }
}