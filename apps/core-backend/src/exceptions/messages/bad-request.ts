export enum BadRequestErrorMessages {
  INCORRECT_PRESCRIPTION_ID = 'Incorrect prescription id.',
  SATUSEHAT_ERROR = 'Something went wrong during the SatuSehat integration process.',
  ALREADY_INTEGRATED = 'The resource has already been integrated with SatuSehat.',
  DIFFERENT_PRACTITIONER = 'This resource was created by a different Practitioner.',
  MR_ALREADY_TWO_DAYS = 'The medical record was created more than two days ago.',
  FILE_LARGER_THAN_4MB = 'The uploaded image file size is larger than 4 MB',
}
