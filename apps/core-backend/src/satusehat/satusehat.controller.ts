import { Body, Controller, Get, Post } from '@nestjs/common';
import { SatusehatOauthService } from 'src/satusehat-oauth/satusehat-oauth.service';
import { CreateOrganizationDto } from 'src/satusehat-organization/dto';
import { SatusehatOrganizationService } from 'src/satusehat-organization/satusehat-organization.service';
import { Public } from 'src/utils';

@Controller('satusehat')
export class SatusehatController {
  constructor(
    private readonly satuSehatOrganizationService: SatusehatOrganizationService,
    private readonly satuSehatOauthService: SatusehatOauthService,
  ) {}

  @Public()
  @Post('organization')
  createOrganization(@Body() dto: CreateOrganizationDto) {
    return this.satuSehatOrganizationService.create(dto);
  }

  @Public()
  @Post('oauth/generate')
  generateOauthToken() {
    return this.satuSehatOauthService.generate();
  }

  @Public()
  @Get('oauth/token')
  getToken() {
    return this.satuSehatOauthService.token();
  }
}
