import { Controller, Get } from '@nestjs/common';
import { Role } from '@prisma/client';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('satusehat-admin')
export class SatusehatAdminController {
  constructor(
    private readonly satusehatRawatJalanService: SatusehatRawatJalanService,
  ) {}

  @Get()
  @Roles(Role.SATUKLINIKADMIN)
  // TODO: owner ga boleh
  async satuSehatIntegration() {
    return await this.satusehatRawatJalanService.handleCron();
  }
}
