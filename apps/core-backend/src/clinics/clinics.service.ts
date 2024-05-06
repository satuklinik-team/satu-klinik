import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { ServiceContext } from 'src/utils/types';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { ClinicNotFoundException } from 'src/exceptions/not-found/clinic-not-found.exception';
import { Role } from '@prisma/client';
import { AddNewOwnerToClinicException } from 'src/exceptions/unauthorized/add-new-owner-to-clinic.exception';
import { exclude } from 'src/utils';
import { UserNotFoundException } from 'src/exceptions';
import { UpdateClinicUserDto } from './dto/update-clinic-user.dto';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
    private readonly userService: UsersService,
  ) {}

  async create(dto: CreateClinicDto, context?: ServiceContext) {
    const prisma = this._initPrisma(context.tx);
    const data = await prisma.clinics.create({
      data: {
        name: dto.clinicName,
        email: dto.clinicEmail,
        address: dto.clinicAddress,
        phone: dto.clinicPhone,
        accountsId: dto.accountsId,
        Poli: {
          create: {
            name: 'main',
            alias: 'A',
          },
        },
        // Setting:{
        //   createMany: {
        //     data: [{name:}]
        //   }
        // }
      },
    });

    return data;
  }

  async findAll(dto: FindAllClinicsDto) {
    const args: Prisma.ClinicsFindManyArgs = {
      where: {
        id: dto.clinicsId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        _count: {
          select: {
            Pharmacy_Task: true,
            users: true,
            Patient: true,
            Category: true,
            Poli: true,
          },
        },
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.clinics,
      ...args,
      ...dto,
    });
  }

  async addUserOnClinic(user: CreateUserDto, clinicId: string) {
    if (user.role === Role.OWNER) {
      throw new AddNewOwnerToClinicException();
    }

    const clinic = await this.prismaService.clinics.findFirst({
      where: {
        id: clinicId,
      },
    });

    if (!clinic) {
      throw new ClinicNotFoundException();
    }

    return await this.prismaService.$transaction(async (tx) => {
      const createdUser = await this.userService.create(user, { tx });
      await tx.clinics.update({
        where: {
          id: clinicId,
        },
        data: {
          users: {
            connect: {
              id: createdUser.id,
            },
          },
        },
      });
      return exclude(createdUser, ['password']);
    });
  }

  async findClinicUsers(clinicId: string) {
    const users = await this.prismaService.users.findMany({
      where: {
        clinicsId: clinicId,
      },
    });

    return users.map((u) => exclude(u, ['password']));
  }

  async updateClinicUser(
    dto: UpdateClinicUserDto,
    clinicId: string,
    userId: string,
  ) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: userId,
        clinicsId: clinicId,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.prismaService.users.update({
      where: {
        id: userId,
        clinicsId: clinicId,
      },
      data: {
        ...dto,
      },
    });
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
