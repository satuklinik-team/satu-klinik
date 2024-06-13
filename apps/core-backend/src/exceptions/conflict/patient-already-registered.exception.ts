import { HttpException, HttpStatus } from '@nestjs/common';
import { ConflictErrorMessages } from '../messages';

export class PatientAlreadyRegistedException extends HttpException {
  constructor() {
    super(
      ConflictErrorMessages.PATIENT_ALREADY_REGISTERED,
      HttpStatus.CONFLICT,
    );
  }
}
