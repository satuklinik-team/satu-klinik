import { Module } from '@nestjs/common';
import { SatusehatTestController } from './satusehat-test.controller';
import { SatusehatRawatJalanModule } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.module';
import { SatusehatKfaModule } from 'src/satusehat-kfa/satusehat-kfa.module';

@Module({
  imports: [SatusehatRawatJalanModule, SatusehatKfaModule],
  controllers: [SatusehatTestController],
})
export class SatusehatTestModule {}
