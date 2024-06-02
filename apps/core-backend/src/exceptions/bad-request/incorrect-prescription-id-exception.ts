import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestErrorMessages } from '../messages';

export class IncorrectPrescriptionIdException extends HttpException {
  constructor() {
    super(
      BadRequestErrorMessages.INCORRECT_PRESCRIPTION_ID,
      HttpStatus.BAD_REQUEST,
    );
  }
}
