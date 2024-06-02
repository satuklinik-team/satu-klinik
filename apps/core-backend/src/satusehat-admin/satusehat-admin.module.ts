import { Module } from '@nestjs/common';
import { SatusehatAdminController } from './satusehat-admin.controller';
import { SatusehatAdminService } from './satusehat-admin.service';
import { SatusehatRawatJalanModule } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.module';

@Module({
  imports: [SatusehatRawatJalanModule],
  controllers: [SatusehatAdminController],
  providers: [SatusehatAdminService],
})
export class SatusehatAdminModule {}
