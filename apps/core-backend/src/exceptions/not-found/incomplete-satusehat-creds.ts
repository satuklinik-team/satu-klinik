import { HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundErrorMessages } from '../messages';

export class IncompleteSatuSehatCreds extends HttpException {
  constructor() {
    super(
      NotFoundErrorMessages.INCOMPLETE_SATUSEHAT_CREDS,
      HttpStatus.NOT_FOUND,
    );
  }
}
