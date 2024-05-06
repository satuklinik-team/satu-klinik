import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { EmailUsedException } from 'src/exceptions';
import { CountUsersDto, CreateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { ChangeClinicIdDto } from './dto/change-clinic-id.dto';
import { ServiceContext } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(
    private cryptoService: CryptoService,
    private prismaService: PrismaService,
  ) {}

  async create(dto: CreateUserDto, context?: ServiceContext) {
    if (await this._isEmailUsed(dto.email)) throw new EmailUsedException();

    const password = await this._getHashedPassword(dto.password);
    const prisma = this._initPrisma(context?.tx);
    const data = await prisma.users.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        roles: dto.role,
        address: dto.address,
        phone: dto.phone,
        password: password,
      },
    });

    return data;
  }

  async changeClinicId(dto: ChangeClinicIdDto, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);
    const data = await prisma.users.update({
      where: {
        id: dto.usersId,
      },
      data: {
        clinicsId: dto.clinicsId,
      },
    });

    return data;
  }

  findAll() {
    return `This action returns all users`;
  }

  async count(dto: CountUsersDto) {
    const data = await this.prismaService.users.count({ where: dto.where });

    return data;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private async _isEmailUsed(email: string) {
    const userCount = await this.prismaService.users.count({
      where: { email },
    });
    return !!userCount;
  }

  private async _getHashedPassword(password: string) {
    const hashedPassword = await this.cryptoService.hash(password);
    return hashedPassword;
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
