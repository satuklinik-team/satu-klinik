export enum ActivityTitles {
  PATIENT_REGISTRATION = 'Patient Registration',
  CREATE_PATIENT = 'Create Patient',
}

export interface ActivityDTO {
  title: ActivityTitles;
  userId: string;
  payload: any;
  clinicsId: string;
}
