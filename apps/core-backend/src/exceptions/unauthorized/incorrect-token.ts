import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedErrorMessages } from '../messages';

export class IncorrectTokenException extends HttpException {
  constructor() {
    super(UnauthorizedErrorMessages.INCORRECT_TOKEN, HttpStatus.UNAUTHORIZED);
  }
}
