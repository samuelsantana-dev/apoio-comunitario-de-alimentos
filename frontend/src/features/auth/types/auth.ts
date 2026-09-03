export const userRoles = ["donor", "institution", "volunteer"] as const;
export type UserRole = (typeof userRoles)[number];
export interface SessionUser {
  name: string;
  email: string;
  role: UserRole;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterData extends LoginCredentials {
  name: string;
  passwordConfirmation: string;
  role: UserRole;
}
