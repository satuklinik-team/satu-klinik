import { Module } from '@nestjs/common';
import { SatusehatOauthService } from './satusehat-oauth.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  providers: [SatusehatOauthService],
  controllers: [],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('http.timeout'),
        maxRedirects: configService.get('http.max_redirects'),
        baseURL: configService.get('satu_sehat.auth_url'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SatusehatOauthService],
})
export class SatusehatOauthModule {}
