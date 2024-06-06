import { Controller, Get, Query } from '@nestjs/common';
import { Icd10Service } from './icd10.service';
import { FindAllICD10Dto } from './dto/find-all-icd10-dto';
import { FindAllReturn } from 'src/utils/types';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('icd10')
export class Icd10Controller {
  constructor(private readonly icd10Service: Icd10Service) {}

  @Get()
  @Roles(Role.DOCTOR)
  async findAll(@Query() dto: FindAllICD10Dto): Promise<FindAllReturn<object>> {
    return await this.icd10Service.findAll(dto);
  }
}
