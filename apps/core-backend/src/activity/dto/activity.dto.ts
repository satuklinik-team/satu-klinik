export enum ActivityTitles {
  PATIENT_REGISTRATION = 'Patient Registration',
  CREATE_PATIENT = 'Create Patient',
  UPDATE_PATIENT = 'Update Patient',
  DELETE_PATIENT = 'Delete Patient',
  CREATE_ASSESSMENT = 'Create Assessment',
  UPDATE_ASSESSMENT = 'Update Assessment',
  COMPLETE_PHARMACY_TASK = 'Complete Pharmacy Task',
  CREATE_MEDICINE_CATEGORY = 'Create Medicine Category',
  UPDATE_MEDICINE_CATEGORY = 'Update Medicine Category',
  DELETE_MEDICINE_CATEGORY = 'Delete Medicine Category',
  CREATE_MEDICINE = 'Create Medicine',
  UPDATE_MEDICINE = 'Update Medicine',
  DELETE_MEDICINE = 'Delete Medicine',
}

export interface ActivityDTO {
  title: ActivityTitles;
  usersId: string;
  payload: any;
  clinicsId: string;
}
