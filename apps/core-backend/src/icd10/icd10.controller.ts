import { Controller, Get, Query } from '@nestjs/common';
import { Icd10Service } from './icd10.service';
import { FindAllICD10Dto } from './dto/find-all-icd10-dto';
import { FindAllReturn } from 'src/utils/types';

@Controller('icd10')
export class Icd10Controller {
  constructor(private readonly icd10Service: Icd10Service) {}

  @Get()
  async findAll(@Query() dto: FindAllICD10Dto): Promise<FindAllReturn<object>> {
    return await this.icd10Service.findAll(dto);
  }
}
