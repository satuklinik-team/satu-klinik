import { Module } from '@nestjs/common';
import { SatusehatOrganizationService } from './satusehat-organization.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  providers: [SatusehatOrganizationService],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('http.timeout'),
        maxRedirects: configService.get('http.max_redirects'),
        baseURL: configService.get('satu_sehat.url'),
        headers: {
          Authorization: `Bearer ${configService.get('oauth.access_token')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SatusehatOrganizationService],
})
export class SatusehatOrganizationModule {}
