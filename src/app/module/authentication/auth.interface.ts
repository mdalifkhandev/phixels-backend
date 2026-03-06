export type TUser = {
  email: string;
  password: string;
  name: string;
  role: "super_admin" | "admin" | "staff" | "client";
  isDeleted: boolean;
  isVerified: boolean;
  verificationCode?: string;
  resetPasswordCode?: string;
  resetPasswordCodeExpiresAt?: Date;
};
