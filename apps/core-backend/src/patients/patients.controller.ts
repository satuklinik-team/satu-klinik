import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { JwtPayload } from 'src/auth/types';
import { FindAllPatientsDto } from './dto/find-all-patients-dto';
import { TokenData } from 'src/utils';
import { FindAllReturn } from 'src/utils/types';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { UpdatePatientDto } from './dto/update-patient-dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  @Roles(Role.ADMIN)
  createPatient(
    @Body() dto: CreatePatientDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientService.create({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get()
  async findAll(
    @Query() dto: FindAllPatientsDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return this.patientService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Patch(':id')
  async updatePatientById(
    @Param('id') id: string,
    @TokenData() tokenData: JwtPayload,
    @Body() dto: UpdatePatientDto,
  ) {
    return await this.patientService.updatePatientById({
      ...dto,
      id,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Get(':id')
  async getPatientById(
    @Param('id') id: string,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.patientService.getPatientById({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string, @TokenData() tokenData: JwtPayload) {
    return await this.patientService.delete({
      id,
      clinicsId: tokenData.clinicsId,
    });
  }
}
