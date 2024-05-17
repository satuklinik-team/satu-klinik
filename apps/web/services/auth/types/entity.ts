import type { UserEntity } from "@/services/user/types/entity";

export interface AuthEntity {
  user: UserEntity;
  token: string;
  expiresIn: number;
}
