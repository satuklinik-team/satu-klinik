import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { SatuSehatErrorException } from 'src/exceptions/bad-request/satusehat-error-exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatOauthService } from 'src/satusehat-oauth/satusehat-oauth.service';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';
import { FindAllKfaMedicinesDto } from './dto/find-all-kfa-medicines-dto';

@Injectable()
export class SatusehatKfaService {
  private logger: Logger = new Logger(SatusehatKfaService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly satusehatOauthService: SatusehatOauthService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(dto: FindAllKfaMedicinesDto) {
    const token = await this.satusehatOauthService.token(dto.clinicsId);

    const queryParams = {
      page: Math.floor(dto.skip / dto.limit) + 1,
      size: dto.limit,
      product_type: 'farmasi',
      keyword: dto.search,
    };

    const { data } = await firstValueFrom(
      this.httpService
        .get('/products/all', {
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          catchError(async (error: AxiosError) => {
            await this.showSatuSehatError(queryParams, error);
            throw new SatuSehatErrorException(error.response.status);
          }),
        ),
    );

    return {
      data: data.items.data.map((value: any) => {
        return {
          name: value.name,
          kfaCode: value.kfa_code,
        };
      }),
      ...(dto.count && { count: data.total }),
    };
  }

  async getKfaDetail(clinicsId: string, kfaCode: string) {
    const token = await this.satusehatOauthService.token(clinicsId);

    const queryParams = {
      identifier: 'kfa',
      code: kfaCode,
    };

    const { data } = await firstValueFrom(
      this.httpService
        .get('/products', {
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          catchError(async (error: AxiosError) => {
            await this.showSatuSehatError(queryParams, error);
            throw new SatuSehatErrorException(error.response.status);
          }),
        ),
    );

    return data;
  }

  async showSatuSehatError(requestBody: any, error: AxiosError) {
    this.logger.error(error.message);
    await this.prismaService.satuSehatError.create({
      data: {
        url: error.request._redirectable._currentUrl,
        requestBody: JSON.stringify(requestBody),
        responseBody: JSON.stringify(error.response.data),
      },
    });
  }
}
