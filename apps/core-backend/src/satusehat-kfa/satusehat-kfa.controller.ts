import { Controller, Get, Query } from '@nestjs/common';
import { SatusehatKfaService } from './satusehat-kfa.service';
import { Role } from '@prisma/client';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { FindAllReturn } from 'src/utils/types';
import { FindAllKfaMedicinesDto } from './dto/find-all-kfa-medicines-dto';

@Controller('satusehat-kfa')
export class SatusehatKfaController {
  constructor(private readonly satusehatKfaService: SatusehatKfaService) {}

  @Get()
  @Roles(Role.PHARMACY)
  async findAll(
    @Query() dto: FindAllKfaMedicinesDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return await this.satusehatKfaService.findAll({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }
}
