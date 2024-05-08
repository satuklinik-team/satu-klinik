import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllICD9CMDto } from './dto/find-all-icd9cm-dto';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';

@Injectable()
export class Icd9cmService {
  constructor(
    private readonly findAllService: FindAllService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(dto: FindAllICD9CMDto) {
    const args: Prisma.ICD9CMFindManyArgs = {
      where: this._findAllFactory(dto),
      orderBy: {
        code: 'asc',
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.iCD9CM,
      ...args,
      ...dto,
    });
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
