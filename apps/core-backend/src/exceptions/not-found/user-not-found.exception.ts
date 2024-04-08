import { HttpException, HttpStatus } from '@nestjs/common';
import { ConflictErrorMessages, NotFoundErrorMessages } from '../messages';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(NotFoundErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
