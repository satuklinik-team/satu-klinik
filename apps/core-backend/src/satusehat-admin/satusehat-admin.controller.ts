import { Controller, Get } from '@nestjs/common';
import { Role } from '@prisma/client';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';

@Controller('satusehat-admin')
export class SatusehatAdminController {
  constructor(
    private readonly satusehatRawatJalanService: SatusehatRawatJalanService,
  ) {}

  @Get()
  async satuSehatIntegration() {
    const x = null;
    return `${x}T00:00:00.000Z`;
    return await this.satusehatRawatJalanService.handleCron();
  }
}
