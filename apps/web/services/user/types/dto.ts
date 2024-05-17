import type { UserRole } from "./entity";

export interface CreateUserDto {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  address: string;
}
