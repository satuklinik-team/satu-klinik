import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestErrorMessages } from '../messages';

export class MRAlready2DaysException extends HttpException {
  constructor() {
    super(BadRequestErrorMessages.MR_ALREADY_TWO_DAYS, HttpStatus.BAD_REQUEST);
  }
}
