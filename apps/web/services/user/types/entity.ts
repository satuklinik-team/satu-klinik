export type UserRole = "ADMIN" | "OWNER" | "SUPERADMIN" | "DOCTOR" | "PHARMACY";

export interface UserEntity {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: UserRole;
  status: string;
}
