import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestErrorMessages } from '../messages';

export class FileLargerThan4MBException extends HttpException {
  constructor() {
    super(BadRequestErrorMessages.FILE_LARGER_THAN_4MB, HttpStatus.BAD_REQUEST);
  }
}
