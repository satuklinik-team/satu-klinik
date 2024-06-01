import { useRef } from "react";

import type { UserEntity } from "@/services/user/types/entity";

export const useGetUserData = (): UserEntity => {
  const user = useRef<UserEntity>(
    JSON.parse(String(localStorage.getItem("user"))),
  );

  return user.current;
};
