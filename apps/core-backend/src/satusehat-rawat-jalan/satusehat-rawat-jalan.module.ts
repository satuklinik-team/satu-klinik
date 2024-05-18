import { Module } from '@nestjs/common';
import { SatusehatRawatJalanService } from './satusehat-rawat-jalan.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { SatusehatOauthModule } from 'src/satusehat-oauth/satusehat-oauth.module';

@Module({
  imports: [
    SatusehatOauthModule,
    HttpModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('http.timeout'),
        maxRedirects: configService.get('http.max_redirects'),
        baseURL: configService.get('satu_sehat.url'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SatusehatRawatJalanService],
})
export class SatusehatRawatJalanModule {}
