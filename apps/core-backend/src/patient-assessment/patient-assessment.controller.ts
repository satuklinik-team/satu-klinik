import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { PatientAssessmentService } from './patient-assessment.service';
import { CreatePatientAssessmentDto } from './dto/create-patient-assessment.dto';
import { FindAllPatientAssessmentDto } from './dto/find-all-patient-assessment.dto';
import { FindAllReturn } from 'src/utils/types';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('patient-assessment')
export class PatientAssessmentController {
  constructor(
    private readonly patientAssessmentService: PatientAssessmentService,
  ) {}

  @Post()
  @Roles(Role.DOCTOR)
  async create(
    @Body() createPatientAssessmentDto: CreatePatientAssessmentDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.patientAssessmentService.create({
      ...createPatientAssessmentDto,
      usersId: tokenData.sub,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get()
  @Roles(Role.DOCTOR)
  async findAll(
    @Query() dto: FindAllPatientAssessmentDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return await this.patientAssessmentService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }
}
