import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestErrorMessages } from '../messages';

export class AlreadyIntegratedException extends HttpException {
  constructor() {
    super(BadRequestErrorMessages.ALREADY_INTEGRATED, HttpStatus.BAD_REQUEST);
  }
}
