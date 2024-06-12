import { HttpException, HttpStatus } from '@nestjs/common';
import { ConflictErrorMessages } from '../messages';

export class MedicineCategoryNotEmptyException extends HttpException {
  constructor() {
    super(
      ConflictErrorMessages.MEDICINE_CATEGORY_NOT_EMPTY,
      HttpStatus.CONFLICT,
    );
  }
}
