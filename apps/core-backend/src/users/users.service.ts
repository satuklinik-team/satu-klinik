import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { EmailUsedException } from 'src/exceptions';
import { CountUsersDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private cryptoService: CryptoService,
    private prismaService: PrismaService,
  ) {}

  async create(dto: CreateUserDto) {
    if (await this._isEmailUsed(dto.email)) throw new EmailUsedException();

    const password = await this._getHashedPassword(dto.password);
    const data = await this.prismaService.users.create({
      data: {
        email: dto.email,
        fullname: dto.name,
        password,
        address: dto.address,
        roles: 'ROLE_USER',
        phone: '62',
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
}
