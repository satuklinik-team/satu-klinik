import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class SatusehatOauthService {
  private logger: Logger = new Logger(SatusehatOauthService.name);

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generate() {
    const client_id = this.configService.get<string>('oauth.client_id');
    const client_secret = this.configService.get<string>('oauth.client_secret');

    const formData = new FormData();
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);

    const { data } = await firstValueFrom(
      this.httpService
        .post(
          '/accesstoken?grant_type=client_credentials',
          { client_id, client_secret },
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.request);
            this.logger.error(error.message);
            throw 'An error happened!';
          }),
        ),
    );
    this.configService.set('oauth.access_token', data.access_token);

    return data;
  }

  async token() {
    return this.configService.get('oauth.access_token');
  }
}
