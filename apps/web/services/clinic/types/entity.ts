export interface ClinicEntity {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  _count: {
    Departments: number;
    users: number;
    Patient: number;
    MedicineCategory: number;
    Pharmacy_Task: number;
  };
}
