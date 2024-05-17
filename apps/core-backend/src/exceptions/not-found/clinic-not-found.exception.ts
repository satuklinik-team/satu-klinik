import { HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundErrorMessages } from '../messages';

export class ClinicNotFoundException extends HttpException {
  constructor() {
    super(NotFoundErrorMessages.CLINIC_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
