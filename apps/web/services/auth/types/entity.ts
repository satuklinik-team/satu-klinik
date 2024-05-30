import type { ClinicEntity } from "@/services/clinic/types/entity";
import type { UserEntity } from "@/services/user/types/entity";

export interface AuthEntity {
  user: UserEntity;
  clinic: ClinicEntity;
  token: string;
  expiresIn: number;
}
