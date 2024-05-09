import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  get(@TokenData() tokenData: JwtPayload) {
    return this.settingsService.get({
      clinicsId: tokenData.clinicsId,
    });
  }

  @Put()
  update(@Body() dto: UpdateSettingsDto, @TokenData() tokenData: JwtPayload) {
    return this.settingsService.update({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }
}
