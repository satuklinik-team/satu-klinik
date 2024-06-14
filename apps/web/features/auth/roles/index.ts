import type { UserRole } from "@/services/user/types/entity";

export const sidebarMenuAccess: Partial<Record<UserRole, string[]>> = {
  DOCTOR: [
    "1::dashboard",
    "2::doctor-menu",
    "2::patient-menu",
    "4::report",
    "5::activity",
  ],
  PHARMACY: ["3::pharmacy-task", "3::pharmacy-inventory"],
};
