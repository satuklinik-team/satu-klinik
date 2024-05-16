import { Controller, Get } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';
import { SatusehatKfaService } from 'src/satusehat-kfa/satusehat-kfa.service';
import { SatusehatOauthService } from 'src/satusehat-oauth/satusehat-oauth.service';
import { TokenData } from 'src/utils';

@Controller('satusehat-test')
export class SatusehatTestController {
  constructor(
    private satusehatOauthService: SatusehatOauthService,
    private satusehatKfaService: SatusehatKfaService,
  ) {}

  @Get()
  coba(@TokenData() tokenData: JwtPayload) {
    // return this.satusehatOauthService.token(tokenData.clinicsId);
    return this.satusehatKfaService.getKfa(tokenData.clinicsId);
  }
}
