import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { QueryPayload, TokenData } from 'src/utils';
import { Prisma } from '@prisma/client';
import { JwtPayload } from 'src/auth/types';
import { FindAllPatientsDto } from './dto/find-all-patients-dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  createPatient(
    @Body() createPatientDto: CreatePatientDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientService.create({
      ...createPatientDto,
      usersId: tokenData.sub,
    });
  }

  @Get()
  async findAll(@Query() dto: FindAllPatientsDto) {
    return this.patientService.findAll(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.patientService.delete(id);
  }
}
