import { Controller, Get, Param } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';

@Controller('satusehat-test')
export class SatusehatTestController {
  constructor(
    private readonly satusehatRawatJalanService: SatusehatRawatJalanService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get(':mrid')
  async test(@Param('mrid') mrid: string) {
    return await this.satusehatRawatJalanService.post(mrid);
  }
}
