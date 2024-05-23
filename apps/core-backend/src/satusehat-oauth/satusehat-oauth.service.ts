import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, firstValueFrom } from 'rxjs';
import { SatuSehatErrorException } from 'src/exceptions/bad-request/satusehat-error-exception';
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

    const clinic = await this.prismaService.clinics.findFirst({
      where: { id: clinicsId },
    });

    const formData = {
      client_id: clinic.clientId,
      client_secret: clinic.clientSecret,
    };

    const { data } = await firstValueFrom(
      this.httpService
        .post('/accesstoken?grant_type=client_credentials', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw new SatuSehatErrorException(error.response.status);
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
