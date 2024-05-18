import { Module } from '@nestjs/common';
import { SatusehatJsonService } from './satusehat-json.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [SatusehatJsonService],
})
export class SatusehatJsonModule {}
