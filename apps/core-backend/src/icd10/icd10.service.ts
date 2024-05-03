import { Injectable } from '@nestjs/common';
import { FindAllICD10Dto } from './dto/find-all-icd10-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class Icd10Service {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(dto: FindAllICD10Dto) {
    const data = await this.prismaService.iCD10.findMany({
      where: this._findAllFactory(dto),
      orderBy: {
        code: 'asc',
      },
      skip: dto.skip,
      take: dto.limit,
    });

    let count = null;
    if (dto.count) {
      count = await this.prismaService.iCD10.count({
        where: this._findAllFactory(dto),
      });
    }

    return { data, count };
  }

  private _findAllFactory(
    dto: FindAllICD10Dto,
  ): Prisma.ICD10FindManyArgs['where'] {
    if (!dto.search) {
      return {};
    }
    return {
      OR: [
        {
          code: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
        {
          strt: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
      ],
    };
  }
}
