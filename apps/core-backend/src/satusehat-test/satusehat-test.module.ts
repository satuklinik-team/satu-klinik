import { Module } from '@nestjs/common';
import { SatusehatTestController } from './satusehat-test.controller';
import { SatusehatOauthModule } from 'src/satusehat-oauth/satusehat-oauth.module';
import { SatusehatKfaModule } from 'src/satusehat-kfa/satusehat-kfa.module';

@Module({
  imports: [SatusehatOauthModule, SatusehatKfaModule],
  controllers: [SatusehatTestController],
})
export class SatusehatTestModule {}
