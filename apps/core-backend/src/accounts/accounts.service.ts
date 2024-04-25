import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account-dto';

@Injectable()
export class AccountsService {
  constructor(private prismaService: PrismaService) {}
  async create(dto: CreateAccountDto) {
    const data = await this.prismaService.accounts.create({
      data: {
        usersId: dto.usersId,
      },
    });
    return data;
  }
}
