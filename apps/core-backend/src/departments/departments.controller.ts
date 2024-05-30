import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  get(@TokenData() tokenData: JwtPayload) {
    return this.departmentsService.get({
      clinicsId: tokenData.clinicsId,
    });
  }
}
