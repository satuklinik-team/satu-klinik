import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';
import { FindAllReturn } from 'src/utils/types';
import { CreateUserDto } from 'src/users/dto';
import { UpdateClinicUserDto } from './dto/update-clinic-user.dto';
import { PaginationDto } from 'src/utils/classes';
import { FindClinicUsersDto } from './dto/find-clinic-users-dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll(
    @Query() dto: FindAllClinicsDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    return await this.clinicsService.findAll({
      usersId: tokenData.sub,
      ...dto,
    });
  }

  @Get('detail')
  async getClinicDetail(@TokenData() tokenData: JwtPayload) {
    return await this.clinicsService.getById(tokenData.clinicsId);
  }

  @Get('users')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async FindClinicUsers(
    @Query() dto: FindClinicUsersDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.clinicsService.findClinicUsers({
      clinicsId: tokenData.clinicsId,
      ...dto,
    });
  }

  @Post('users')
  @Roles(Role.ADMIN)
  async addUserOnClinic(
    @Body() dto: CreateUserDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.clinicsService.addUserOnClinic(dto, tokenData.clinicsId);
  }

  @Get('users/:id')
  @Roles(Role.ADMIN)
  async getUserById(
    @TokenData() tokenData: JwtPayload,
    @Param('id') usersId: string,
  ) {
    return await this.clinicsService.getUserById({
      usersId,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Patch('users/:id')
  @Roles(Role.ADMIN)
  async updateClinicUser(
    @Body() dto: UpdateClinicUserDto,
    @TokenData() tokenData: JwtPayload,
    @Param('id') userId: string,
  ) {
    return await this.clinicsService.updateClinicUser(
      dto,
      tokenData.clinicsId,
      userId,
    );
  }

  @Delete('users/:id')
  @Roles(Role.ADMIN)
  async deleteUser(
    @TokenData() TokenData: JwtPayload,
    @Param('id') userId: string,
  ) {
    return await this.clinicsService.deleteClinicUser(
      TokenData.clinicsId,
      userId,
    );
  }
}
