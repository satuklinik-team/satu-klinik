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
import { JwtPayload } from 'src/auth/types';
import { FindAllPatientsDto } from './dto/find-all-patients-dto';
import { TokenData } from 'src/utils';
import { FindAllReturn } from 'src/utils/types';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  createPatient(
    @Body() dto: CreatePatientDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientService.create({
      ...dto,
      tokenData,
    });
  }

  @Get()
  async findAll(
    @Query() dto: FindAllPatientsDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return this.patientService.findAll({ ...dto, tokenData });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @TokenData() tokenData: JwtPayload) {
    return this.patientService.delete({
      id,
      tokenData,
    });
  }
}
