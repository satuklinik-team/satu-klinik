import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestErrorMessages } from '../messages';

export class DifferentPractitionerException extends HttpException {
  constructor() {
    super(
      BadRequestErrorMessages.DIFFERENT_PRACTITIONER,
      HttpStatus.BAD_REQUEST,
    );
  }
}
