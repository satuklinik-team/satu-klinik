import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { PatientAssessmentService } from './patient-assessment.service';
import { CreatePatientAssessmentDto } from './dto/create-patient-assessment.dto';
import { FindAllPatientAssessmentDto } from './dto/find-all-patient-assessment.dto';
import { FindAllReturn } from 'src/utils/types';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PractitionerOnly } from 'src/utils/decorators/practitioner-only.decorator';
import { UpdatePatientAssessmentDto } from './dto/update-patient-assessment.dto';

@Controller('patient-assessment')
export class PatientAssessmentController {
  constructor(
    private readonly patientAssessmentService: PatientAssessmentService,
  ) {}

  @Post()
  @Roles(Role.DOCTOR)
  @PractitionerOnly()
  async create(
    @Body() dto: CreatePatientAssessmentDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.usersId = tokenData.sub;
    dto.clinicsId = tokenData.clinicsId;

    return await this.patientAssessmentService.createOrUpdate(dto);
  }

  @Patch(':id')
  @Roles(Role.DOCTOR)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientAssessmentDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.id = id;
    dto.usersId = tokenData.sub;
    dto.clinicsId = tokenData.clinicsId;

    return await this.patientAssessmentService.createOrUpdate({
      ...dto,
      id,
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
