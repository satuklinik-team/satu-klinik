import { Controller, Get, Param, Query } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatKfaService } from 'src/satusehat-kfa/satusehat-kfa.service';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';

@Controller('satusehat-test')
export class SatusehatTestController {
  constructor(
    private readonly satusehatRawatJalanService: SatusehatRawatJalanService,
    private readonly prismaService: PrismaService,
    private readonly satusehatKfaService: SatusehatKfaService,
  ) {}

  @Get('')
  async test(@Query('clinicsId') clinicsId: string) {
    // @Query('kfaCode') kfaCode: string, // @Query('mrid') mrid: string, // @Query('clinicsId') clinicsId: string,
    return await this.satusehatRawatJalanService.ensureMedicationsSatuSehatId(
      clinicsId,
    );
  }
}
