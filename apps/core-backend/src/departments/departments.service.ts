import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetDepartmentsDto } from './dto/get-departments-dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(dto: GetDepartmentsDto) {
    return await this.prismaService.departments.findMany({
      where: {
        clinicsId: dto.clinicsId,
      },
    });
  }
}
