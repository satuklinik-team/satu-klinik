import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SatusehatOauthService {
  private logger: Logger = new Logger(SatusehatOauthService.name);

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generate(clinicsId: string) {
    const cacheKey = `satusehat_access_token_${clinicsId}`;
    const clientIdCacheKey = `satusehat_client_id_${clinicsId}`;
    const clientSecretCacheKey = `satusehat_client_secret_${clinicsId}`;

    let clientId = await this.cacheManager.get<string>(clientIdCacheKey);
    let clientSecret = await this.cacheManager.get<string>(
      clientSecretCacheKey,
    );

    if (!clientId || !clientSecret) {
      const clinic = await this.prismaService.clinics.findFirst({
        where: { id: clinicsId },
      });

      clientId = clinic.clientId;
      clientSecret = clinic.clientSecret;

      await this.cacheManager.set(clientIdCacheKey, clientId);
      await this.cacheManager.set(clientSecretCacheKey, clientSecret);
    }

    const formData = {
      client_id: clientId,
      client_secret: clientSecret,
    };

    const { data } = await firstValueFrom(
      this.httpService
        .post('/accesstoken?grant_type=client_credentials', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw 'An error happened!';
          }),
        ),
    );

    await this.cacheManager.set(
      cacheKey,
      data.access_token,
      data.expires_in - 1000,
    );

    return data.access_token;
  }

  async token(clinicsId: string) {
    const cacheKey = `satusehat_access_token_${clinicsId}`;
    const token = await this.cacheManager.get<string>(cacheKey);

    if (token) {
      return token;
    }

    return await this.generate(clinicsId);
  }
}
