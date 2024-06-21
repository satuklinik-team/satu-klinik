import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClinicCredsDto } from './dto/update-clinic-creds.dto';
import { exclude } from 'src/utils';

@Injectable()
export class SatusehatAdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateClinicCreds(dto: UpdateClinicCredsDto) {
    return await this.prismaService.clinics.update({
      where: {
        id: dto.clinicsId,
      },
      data: exclude(dto, ['clinicsId']),
    });
  }
}
