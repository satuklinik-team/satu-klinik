import { Module } from '@nestjs/common';
import { SatusehatKfaService } from './satusehat-kfa.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { SatusehatOauthModule } from 'src/satusehat-oauth/satusehat-oauth.module';
import { SatusehatKfaController } from './satusehat-kfa.controller';

@Module({
  providers: [SatusehatKfaService],
  imports: [
    SatusehatOauthModule,
    HttpModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('http.timeout'),
        maxRedirects: configService.get('http.max_redirects'),
        baseURL: configService.get('satu_sehat.kfa_url'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SatusehatKfaService],
  controllers: [SatusehatKfaController],
})
export class SatusehatKfaModule {}
