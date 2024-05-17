import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatOauthService } from 'src/satusehat-oauth/satusehat-oauth.service';

@Injectable()
export class SatusehatKfaService {
  private logger: Logger = new Logger(SatusehatKfaService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly satusehatOauthService: SatusehatOauthService,
  ) {}

  async getKfa(clinicsId: string) {
    const token = await this.satusehatOauthService.token(clinicsId);
    this.httpService.axiosRef.defaults.headers.common.Authorization = `Bearer ${token}`;

    const queryParams = {
      page: 1,
      size: 1,
      product_type: 'farmasi',
      keyword: 'mix',
    };

    const { data } = await firstValueFrom(
      this.httpService.get('/products/all', { params: queryParams }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }
}
