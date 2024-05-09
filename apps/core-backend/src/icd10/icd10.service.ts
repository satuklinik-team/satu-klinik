import { Injectable } from '@nestjs/common';
import { FindAllICD10Dto } from './dto/find-all-icd10-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';

@Injectable()
export class Icd10Service {
  constructor(
    private readonly findAllService: FindAllService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(dto: FindAllICD10Dto) {
    const args: Prisma.ICD10FindManyArgs = {
      where: this._findAllFactory(dto),
      orderBy: {
        code: 'asc',
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.iCD10,
      ...args,
      ...dto,
    });
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
