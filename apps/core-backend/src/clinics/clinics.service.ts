import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { ServiceContext } from 'src/utils/types';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';

@Injectable()
export class ClinicsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateClinicDto, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);
    const data = await prisma.clinics.create({
      data: {
        name: dto.clinicName,
        email: dto.clinicEmail,
        address: dto.clinicAddress,
        phone: dto.clinicPhone,
        accountsId: dto.accountsId,
      },
    });

    return data;
  }

  async findAll(dto: FindAllClinicsDto) {
    const accounts = await this.prismaService.accounts.findFirst({
      where: {
        usersId: dto.usersId,
      },
      select: {
        id: true,
      },
    });

    const data = await this.prismaService.clinics.findMany({
      where: {
        accountsId: accounts.id,
      },
      skip: dto.skip,
      take: dto.limit,
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        _count: {
          select: {
            Pharmacy_Task: true,
            users: true,
            Patient: true,
            Category: true,
            Poli: true,
          },
        },
      },
    });

    let count = null;
    if (dto.count) {
      count = await this.prismaService.clinics.count({
        where: {
          accountsId: accounts.id,
        },
      });
    }

    return { data, count };
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
