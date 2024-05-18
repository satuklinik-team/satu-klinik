import { Controller, Get, Param } from '@nestjs/common';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';

@Controller('satusehat-test')
export class SatusehatTestController {
  constructor(
    private readonly satusehatRawatJalanService: SatusehatRawatJalanService,
  ) {}

  @Get(':mrid')
  async test(@Param('mrid') mrid: string) {
    return await this.satusehatRawatJalanService.post(mrid);
  }
}
