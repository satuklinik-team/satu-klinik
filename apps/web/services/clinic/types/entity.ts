export interface ClinicEntity {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  _count: {
    Poli: number;
    users: number;
    Patient: number;
    Category: number;
    Pharmacy_Task: number;
  };
}
