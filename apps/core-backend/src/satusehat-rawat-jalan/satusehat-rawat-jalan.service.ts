import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { SatuSehatErrorException } from 'src/exceptions/bad-request/satusehat-error-exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatJsonService } from 'src/satusehat-json/satusehat-json.service';
import { SatusehatOauthService } from 'src/satusehat-oauth/satusehat-oauth.service';

@Injectable()
export class SatusehatRawatJalanService {
  private logger: Logger = new Logger(SatusehatRawatJalanService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private httpService: HttpService,
    private readonly satusehatOauthService: SatusehatOauthService,
    private readonly satusehatJsonService: SatusehatJsonService,
  ) {}

  async post(mrid: string) {
    const clinics = await this.prismaService.patient_medical_records.findFirst({
      where: {
        id: mrid,
      },
      select: {
        Patient: {
          select: {
            clinicsId: true,
          },
        },
      },
    });

    const token = await this.satusehatOauthService.token(
      clinics.Patient.clinicsId,
    );
    this.httpService.axiosRef.defaults.headers.common.Authorization = `Bearer ${token}`;

    const body = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [
        {
          fullUrl: 'urn:uuid:7bc68ccf-22b9-464a-ba8d-f99a14a33171',
          resource: this.satusehatJsonService.encounterJson(mrid),
        },
      ],
    };

    const { data } = await firstValueFrom(
      this.httpService.post('', body).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new SatuSehatErrorException(error.response.status);
        }),
      ),
    );

    return data;
  }
}
