import { Injectable } from '@nestjs/common';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatusehatOrganizationService } from 'src/satusehat-organization/satusehat-organization.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { ServiceContext } from 'src/utils/types';
import { GetClinicsByAccountsId } from './dto/get-clinics-by-accounts-id.dto';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly satuSehatOrganizationService: SatusehatOrganizationService,
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
      },
    });

    return data;
  }

  async findAll(dto: GetClinicsByAccountsId) {
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

    const totalClinics = await this.prismaService.clinics.count({
      where: {
        accountsId: accounts.id,
      },
    });

    return { ...data, totalClinics };
  }

  findOne(id: string) {
    return `This action returns a #${id} clinic`;
  }

  update(id: string, dto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }

  remove(id: string) {
    return `This action removes a #${id} clinic`;
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
