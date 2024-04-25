import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prismaService: PrismaService) {}
  async create(usersId: string) {
    const data = await this.prismaService.accounts.create({
      data: {
        usersId: usersId,
      },
    });
    return data;
  }
}
