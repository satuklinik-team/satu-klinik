import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedErrorMessages } from '../messages';

export class CannotAccessClinicException extends HttpException {
  constructor() {
    super(
      UnauthorizedErrorMessages.CANNOT_ACCESS_CLINIC,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
