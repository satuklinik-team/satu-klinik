import { Module } from '@nestjs/common';
import { SatusehatJsonService } from './satusehat-json.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [SatusehatJsonService],
  exports: [SatusehatJsonService],
})
export class SatusehatJsonModule {}