import { HttpException, HttpStatus } from '@nestjs/common';
import {
  BadRequestErrorMessages,
  UnauthorizedErrorMessages,
} from '../messages';

export class SatuSehatErrorException extends HttpException {
  constructor(status: HttpStatus) {
    super(BadRequestErrorMessages.SATUSEHAT_ERROR, status);
  }
}
