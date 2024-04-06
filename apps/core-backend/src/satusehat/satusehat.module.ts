import { Module } from '@nestjs/common';
import { SatusehatService } from './satusehat.service';
import { SatusehatController } from './satusehat.controller';
import { SatusehatOrganizationModule } from 'src/satusehat-organization/satusehat-organization.module';
import { SatusehatOauthModule } from 'src/satusehat-oauth/satusehat-oauth.module';

@Module({
  providers: [SatusehatService],
  imports: [SatusehatOrganizationModule, SatusehatOauthModule],
  controllers: [SatusehatController],
})
export class SatusehatModule {}
