import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedErrorMessages } from '../messages';

export class IncorrectEmailPasswordException extends HttpException {
  constructor() {
    super(
      UnauthorizedErrorMessages.INCORRECT_EMAIL_PASSWORD,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
