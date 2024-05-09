import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { GetSettingsDto } from './dto/get-settings-dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(dto: UpdateSettingsDto) {
    await this.prismaService.$transaction(async (tx) => {
      await tx.clinics.update({
        where: {
          id: dto.clinicsId,
        },
        data: {
          name: dto.name,
          license: dto.license,
          phone: dto.phone,
          address: dto.address,
        },
      });

      await tx.setting.updateMany({
        where: {
          clinicsId: dto.clinicsId,
          name: 'SERVICEFEE',
        },
        data: {
          value: dto.serviceFee.toString(),
        },
      });

      await tx.setting.updateMany({
        where: {
          clinicsId: dto.clinicsId,
          name: 'FASYANKESID',
        },
        data: {
          value: dto.fasyankesId,
        },
      });
    });

    return await this.get({ clinicsId: dto.clinicsId });
  }

  async get(dto: GetSettingsDto) {
    return await this.prismaService.clinics.findFirst({
      where: {
        id: dto.clinicsId,
      },
      select: {
        id: true,
        name: true,
        license: true,
        phone: true,
        address: true,
        Setting: true,
      },
    });
  }
}
