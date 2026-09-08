export const userRoles = ["donor", "beneficiary", "institution", "volunteer", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleLabels: Record<UserRole, string> = {
  donor: "Doador", beneficiary: "Família / Beneficiário", institution: "Instituição / ONG", volunteer: "Voluntário / Entregador", admin: "Administrador",
};
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
