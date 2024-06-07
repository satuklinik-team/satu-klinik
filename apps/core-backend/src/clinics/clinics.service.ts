import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { ServiceContext } from 'src/utils/types';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { ClinicNotFoundException } from 'src/exceptions/not-found/clinic-not-found.exception';
import { Role } from '@prisma/client';
import { AddNewOwnerToClinicException } from 'src/exceptions/unauthorized/add-new-owner-to-clinic.exception';
import { exclude } from 'src/utils';
import { UserNotFoundException } from 'src/exceptions';
import { UpdateClinicUserDto } from './dto/update-clinic-user.dto';
import { FindClinicUsersDto } from './dto/find-clinic-users-dto';
import { ConfigService } from '@nestjs/config';
import { MedicineCategory } from 'src/medicine-category/entities/medicine-category.entity';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
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
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        organizationId: process.env.ORG_ID,
        locationSatuSehatId: process.env.LOCATION_ID,
        locationName: process.env.LOCATION_NAME,
        Departments: {
          create: {
            name: 'main',
            alias: 'A',
          },
        },
        Setting: {
          createMany: {
            data: [
              {
                name: 'CLINFO',
                type: 'GROUP',
                value: 'CLINIC INFO',
                headerId: '',
              },
              {
                name: 'SERVICEFEE',
                type: 'CURRENCY',
                value: '1000',
                headerId: 'CLINFO',
              },
              {
                name: 'FASYANKESID',
                type: 'TEXT',
                headerId: 'CLINFO',
              },
            ],
          },
        },
      },
    });

    const obatCategory = await prisma.medicineCategory.create({
      data: {
        clinicsId: data.id,
        name: 'Obat',
      },
    });

    const vitaminCategory = await prisma.medicineCategory.create({
      data: {
        clinicsId: data.id,
        name: 'Vitamin',
      },
    });

    return {
      ...data,
      medicineCategory: [{ ...obatCategory }, { ...vitaminCategory }],
    };
  }

  async findAll(dto: FindAllClinicsDto) {
    const args: Prisma.ClinicsFindManyArgs = {
      where: {
        Accounts: {
          usersId: dto.usersId,
        },
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
            Departments: true,
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

  async findClinicUsers(dto: FindClinicUsersDto) {
    const args: Prisma.UsersFindManyArgs = {
      where: {
        clinicsId: dto.clinicsId,
      },
    };
    const { data, count } = await this.findAllService.findAll({
      table: this.prismaService.users,
      ...args,
      ...dto,
    });

    const mappedData = data.map((u: any) => exclude(u, ['password']));

    return { data: mappedData, count };
  }

  async getUserById(dto: GetUserByIdDto) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: dto.usersId,
        clinicsId: dto.clinicsId,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return exclude(user, ['password']);
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

    const updatedUser = await this.prismaService.users.update({
      where: {
        id: userId,
        clinicsId: clinicId,
      },
      data: {
        ...dto,
      },
    });

    return exclude(updatedUser, ['password']);
  }

  async deleteClinicUser(clinicId: string, userId: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: userId,
        clinicsId: clinicId,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.prismaService.users.delete({
      where: {
        id: userId,
      },
    });

    return exclude(user, ['password']);
  }

  private _initPrisma(tx?: ServiceContext['tx']) {
    if (tx) {
      return tx;
    }
    return this.prismaService;
  }
}
