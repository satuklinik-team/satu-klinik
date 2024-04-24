export interface ClinicEntity {
  id: string;
  name: string;
  city: string;
  phoneNumber: string;
  _count: {
    totalRecords: number;
    totalUsers: number;
    totalPatient: number;
    totalDepartment: number;
    totalCategory: number;
  };
}
