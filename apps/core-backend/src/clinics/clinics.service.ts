import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { SatusehatOrganizationService } from 'src/satusehat-organization/satusehat-organization.service';
import { RegisterDto } from 'src/auth/dto';
import { Role } from '@prisma/client';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly satuSehatOrganizationService: SatusehatOrganizationService,
  ) {}

  async create(dto: RegisterDto, accountsId: string) {
    const data = await this.prismaService.clinics.create({
      data: {
        name: dto.clinicName,
        email: dto.clinicEmail,
        address: dto.clinicAddress,
        phone: dto.clinicPhone,
        accountsId,
      },
    });

    return data;
  }

  findAll() {
    return `This action returns all clinics`;
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
}
