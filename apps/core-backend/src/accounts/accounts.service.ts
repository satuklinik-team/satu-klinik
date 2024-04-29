import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account-dto';
import { ServiceContext } from 'src/utils/types';

@Injectable()
export class AccountsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateAccountDto, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);
    const data = await prisma.accounts.create({
      data: {
        usersId: dto.usersId,
      },
    });
    return data;
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
