import { HttpException, HttpStatus } from '@nestjs/common';
import { ConflictErrorMessages } from '../messages';

export class EmailUsedException extends HttpException {
  constructor() {
    super(ConflictErrorMessages.EMAIL_USED, HttpStatus.CONFLICT);
  }
}
