export type UserRole = "ADMIN" | "OWNER" | "SUPERADMIN" | "DOCTOR" | "PHARMACY";

export interface UserEntity {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  roles: UserRole;
  isActive: boolean;
  satuSehatId?: string;
}
