import { Controller, Get, Query } from '@nestjs/common';
import { Icd9cmService } from './icd9cm.service';
import { FindAllICD9CMDto } from './dto/find-all-icd9cm-dto';
import { FindAllReturn } from 'src/utils/types';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('icd9cm')
export class Icd9cmController {
  constructor(private readonly icd10Service: Icd9cmService) {}

  @Get()
  @Roles(Role.DOCTOR)
  async findAll(
    @Query() dto: FindAllICD9CMDto,
  ): Promise<FindAllReturn<object>> {
    return await this.icd10Service.findAll(dto);
  }
}
