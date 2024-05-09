import { Controller, Get, Query } from '@nestjs/common';
import { Icd9cmService } from './icd9cm.service';
import { FindAllICD9CMDto } from './dto/find-all-icd9cm-dto';
import { FindAllReturn } from 'src/utils/types';

@Controller('icd9cm')
export class Icd9cmController {
  constructor(private readonly icd10Service: Icd9cmService) {}

  @Get()
  async findAll(
    @Query() dto: FindAllICD9CMDto,
  ): Promise<FindAllReturn<object>> {
    return await this.icd10Service.findAll(dto);
  }
}
