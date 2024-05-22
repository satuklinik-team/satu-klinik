import { Module } from '@nestjs/common';
import { SatusehatJsonService } from './satusehat-json.service';
import { CacheModule } from '@nestjs/cache-manager';
import { SatusehatKfaModule } from 'src/satusehat-kfa/satusehat-kfa.module';

@Module({
  imports: [SatusehatKfaModule],
  providers: [SatusehatJsonService],
  exports: [SatusehatJsonService],
})
export class SatusehatJsonModule {}
