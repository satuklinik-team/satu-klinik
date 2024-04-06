import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateOrganizationDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SatusehatOrganizationService {
  private readonly logger = new Logger(SatusehatOrganizationService.name);

  private organizationID = '';
  private endpoint = '/Organization';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.organizationID = this.configService.get<string>(
      'satu_sehat.organization_id',
    );
  }

  async create(dto: CreateOrganizationDto) {
    const body = this._createOrganizationBodyFactory(dto);
    const token = this.configService.get<string>('oauth.access_token');
    this.httpService.axiosRef.defaults.headers.common.Authorization = `Bearer ${token}`;

    const { data } = await firstValueFrom(
      this.httpService.post(this.endpoint, body).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  private _createOrganizationBodyFactory(dto: CreateOrganizationDto) {
    let display = '';
    if (dto.type === 'prov') {
      display = 'Hospital Provider';
    } else if (dto.type === 'dept') {
      display = 'Hospital Department';
    }

    return {
      resourceType: 'Organization',
      active: true,
      type: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/organization-type',
              code: dto.type,
              display,
            },
          ],
        },
      ],
      name: dto.name,
      telecom: [
        {
          system: 'phone',
          value: '+' + dto.telecom.phone,
          use: 'work',
        },
        {
          system: 'email',
          value: dto.telecom.email,
          use: 'work',
        },
        {
          system: 'url',
          value: dto.telecom.url ?? '',
          use: 'work',
        },
      ],
      address: [
        {
          use: 'work',
          type: 'both',
          line: [dto.address.line],
          city: dto.address.city,
          postalCode: dto.address.postalCode,
          country: 'ID',
          extension: [
            {
              url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode',
              extension: [
                {
                  url: 'province',
                  valueCode: dto.address.ext.province,
                },
                {
                  url: 'city',
                  valueCode: dto.address.ext.city,
                },
                {
                  url: 'district',
                  valueCode: dto.address.ext.district,
                },
                {
                  url: 'village',
                  valueCode: dto.address.ext.village,
                },
              ],
            },
          ],
        },
      ],
      partOf: {
        reference: 'Organization/' + this.organizationID,
      },
    };
  }
}
