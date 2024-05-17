import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedErrorMessages } from '../messages';

export class AddNewOwnerToClinicException extends HttpException {
  constructor() {
    super(
      UnauthorizedErrorMessages.ADD_NEW_OWNER_TO_CLINIC,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
