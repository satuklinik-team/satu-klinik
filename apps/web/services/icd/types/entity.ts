export interface Icd10Entity {
  code: string;
  strt: string;
  sab: string;
}

export interface Icd9CMEntity extends Omit<Icd10Entity, "strt"> {
  str: string;
}
