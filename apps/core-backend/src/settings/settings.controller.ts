import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { SettingsService } from './settings.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles(Role.ADMIN)
  get(@TokenData() tokenData: JwtPayload) {
    return this.settingsService.get({
      clinicsId: tokenData.clinicsId,
    });
  }

  @Patch()
  @Roles(Role.ADMIN)
  update(@Body() dto: UpdateSettingsDto, @TokenData() tokenData: JwtPayload) {
    return this.settingsService.update({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }
}
