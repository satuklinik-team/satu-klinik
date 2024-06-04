import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceContext } from 'src/utils/types';
import { IncreaseRevenueDto } from './dto/complete-task.dto';

@Injectable()
export class RevenueService {
  constructor(private readonly prismaService: PrismaService) {}

  async increaseRevenue(dto: IncreaseRevenueDto, context?: ServiceContext) {
    const prisma = this._initPrisma(context?.tx);
    const now = new Date();
    const date = now.toLocaleDateString();

    const updatedRevenue = await prisma.revenue.updateMany({
      where: {
        date,
        clinicsId: dto.clinicsId,
      },
      data: {
        total: {
          increment: dto.value,
        },
      },
    });

    if (!updatedRevenue) {
      await prisma.revenue.create({
        data: {
          date,
          total: dto.value,
          clinicsId: dto.clinicsId,
        },
      });
    }

    return;
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
