import { sidebarMenuAccess } from "@/features/auth/roles";
import type { UserRole } from "@/services/user/types/entity";

export const isValidMenuAccess = (role: UserRole) => {
  const access = sidebarMenuAccess[role];
  if (!access) return { group: ["*"], menu: { "*": ["*"] } };

  const splittedAccess = access.map((item) => {
    const [group, items] = item.split("::");

    return { group, items };
  });

  return {
    group: splittedAccess.map((item) => item.group),
    menu: splittedAccess.reduce<Record<string, string[]>>((prev, curr) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- necessary
      if (!prev[curr.group]) return { ...prev, [curr.group]: [curr.items] };

      return { ...prev, [curr.group]: [...prev[curr.group], curr.items] };
    }, {}),
  };
};

export const getIsValidMenuAccess = (
  role: UserRole,
  { groupId, menuId }: { groupId: string; menuId: string },
): boolean => {
  const access = isValidMenuAccess(role);
  if (access.group.includes("*")) return true;

  if (access.group.includes(groupId)) {
    return access.menu[groupId].includes(menuId);
  }

  return false;
};
