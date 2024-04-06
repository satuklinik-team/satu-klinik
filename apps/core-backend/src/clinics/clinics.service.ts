import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { SatusehatOrganizationService } from 'src/satusehat-organization/satusehat-organization.service';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly satuSehatOrganizationService: SatusehatOrganizationService,
  ) {}

  async create(dto: CreateClinicDto) {
    const { data } = await this.prismaService.$transaction(async (tx) => {
      const createClinic = await tx.clinics.create({
        data: {
          id: uuidv4(),
          address: dto.address,
          name: dto.name,
          phone: dto.phone,
        },
      });

      await this.satuSehatOrganizationService.create({
        address: dto.addressDetail,
        name: dto.name,
        type: 'dept',
        telecom: {
          email: dto.email,
          phone: dto.phone,
          url: dto.url,
        },
      });

      return { data: createClinic };
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
