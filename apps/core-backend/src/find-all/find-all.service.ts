import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllDto } from './dto/find-all-dto';

@Injectable()
export class FindAllService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(dto: FindAllDto) {
    const data = await dto.table.findMany({
      where: dto.where,
      select: dto.select,
      orderBy: dto.orderBy,
      skip: dto.skip,
      take: dto.limit,
    });

    let count = null;
    if (dto.count) {
      count = await dto.table.count({
        where: dto.where,
      });
    }

    return { data, count };
  }
}
