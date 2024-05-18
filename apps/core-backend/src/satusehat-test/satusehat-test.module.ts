import { Module } from '@nestjs/common';
import { SatusehatTestController } from './satusehat-test.controller';
import { SatusehatRawatJalanModule } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.module';

@Module({
  imports: [SatusehatRawatJalanModule],
  controllers: [SatusehatTestController],
})
export class SatusehatTestModule {}
