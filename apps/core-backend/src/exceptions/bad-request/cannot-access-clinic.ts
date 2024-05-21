import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedErrorMessages } from '../messages';

export class IncorrectPrescriptionIdException extends HttpException {
  constructor() {
    super(
      UnauthorizedErrorMessages.INCORRECT_PRESCRIPTION_ID,
      HttpStatus.BAD_REQUEST,
    );
  }
}
