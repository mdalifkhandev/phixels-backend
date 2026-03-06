export const USER_ROLE = {
  super_admin: "super_admin",
  admin: "admin",
  staff: "staff",
  client: "client",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
