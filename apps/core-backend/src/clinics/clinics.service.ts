import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { ServiceContext } from 'src/utils/types';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
  ) {}

  async create(dto: CreateClinicDto, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);
    const data = await prisma.clinics.create({
      data: {
        name: dto.clinicName,
        email: dto.clinicEmail,
        address: dto.clinicAddress,
        phone: dto.clinicPhone,
        accountsId: dto.accountsId,
        Departments: {
          create: {
            name: 'main',
            alias: 'A',
          },
        },
        Setting: {
          createMany: {
            data: [
              {
                name: 'CLINFO',
                type: 'GROUP',
                value: 'CLINIC INFO',
                headerId: '',
              },
              {
                name: 'SERVICEFEE',
                type: 'CURRENCY',
                value: '1000',
                headerId: 'CLINFO',
              },
              {
                name: 'FASYANKESID',
                type: 'TEXT',
                headerId: 'CLINFO',
              },
            ],
          },
        },
      },
    });

    return data;
  }

  async findAll(dto: FindAllClinicsDto) {
    const args: Prisma.ClinicsFindManyArgs = {
      where: {
        id: dto.clinicsId,
      },
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
            Departments: true,
          },
        },
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.clinics,
      ...args,
      ...dto,
    });
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
