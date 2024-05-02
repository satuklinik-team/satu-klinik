import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllICD9CMDto } from './dto/find-all-icd9cm-dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class Icd9cmService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(dto: FindAllICD9CMDto) {
    const data = await this.prismaService.iCD9CM.findMany({
      where: this._findAllFactory(dto),
      orderBy: {
        code: 'asc',
      },
      skip: dto.skip,
      take: dto.limit,
    });

    return data;
  }

  private _findAllFactory(
    dto: FindAllICD9CMDto,
  ): Prisma.ICD9CMFindFirstArgs['where'] {
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
          str: {
            contains: dto.search,
            mode: 'insensitive',
          },
        },
      ],
    };
  }
}
