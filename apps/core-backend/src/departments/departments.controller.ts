import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { JwtPayload } from 'src/auth/types';
import { TokenData } from 'src/utils';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @Roles(Role.DOCTOR)
  get(@TokenData() tokenData: JwtPayload) {
    return this.departmentsService.get({
      clinicsId: tokenData.clinicsId,
    });
  }
}
