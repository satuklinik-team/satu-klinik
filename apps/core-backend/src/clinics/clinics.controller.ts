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

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async findAll(
    @Query() dto: FindAllClinicsDto,
    @TokenData() tokenData: JwtPayload,
  ): Promise<FindAllReturn<object>> {
    const { data, count } = await this.clinicsService.findAll({
      usersId: tokenData.sub,
      clinicsId: tokenData.clinicsId,
      ...dto,
    });

    return { data, count };
  }

  @Get('users')
  async FindClinicUsers(@TokenData() tokenData: JwtPayload) {
    return await this.clinicsService.findClinicUsers(tokenData.clinicsId);
  }

  @Post('users')
  async addUserOnClinic(
    @Body() dto: CreateUserDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.clinicsService.addUserOnClinic(dto, tokenData.clinicsId);
  }

  @Patch('users/:id')
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
