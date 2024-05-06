import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';
import { FindAllClinicsDto } from './dto/find-all-clinics-dto';
import { FindAllReturn } from 'src/utils/types';
import { CreateUserDto } from 'src/users/dto';

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

  @Post('add-user')
  async addUserOnClinic(
    @Body() dto: CreateUserDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return await this.clinicsService.addUserOnClinic(
      dto,
      'babd0381-e07f-4f72-a7f9-5bdaa1461f59',
    );
  }

  @Get('users')
  async FindClinicUsers(@TokenData() tokenData: JwtPayload) {
    return await this.clinicsService.findClinicUsers(
      'babd0381-e07f-4f72-a7f9-5bdaa1461f59',
    );
  }
}
