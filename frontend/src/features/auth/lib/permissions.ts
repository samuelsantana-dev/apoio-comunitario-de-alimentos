import type { UserRole } from "../types/auth";

export const permissions = {
  createDonation: ["donor"] as UserRole[],
  requestDonation: ["beneficiary", "institution"] as UserRole[],
  acceptDelivery: ["volunteer"] as UserRole[],
  moderateDonation: ["admin"] as UserRole[],
};

export function hasPermission(
  role: UserRole | undefined,
  permission: keyof typeof permissions,
) {
  return role !== undefined && permissions[permission].includes(role);
}
