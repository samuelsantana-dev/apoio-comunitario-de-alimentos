import { describe, expect, it } from "vitest";
import { hasPermission } from "./permissions";

describe("hasPermission", () => {
  it("concede cada ação somente ao perfil autorizado", () => {
    expect(hasPermission("donor", "createDonation")).toBe(true);
    expect(hasPermission("beneficiary", "requestDonation")).toBe(true);
    expect(hasPermission("institution", "requestDonation")).toBe(true);
    expect(hasPermission("volunteer", "acceptDelivery")).toBe(true);
    expect(hasPermission("admin", "moderateDonation")).toBe(true);
  });

  it("nega ações para perfis sem a permissão", () => {
    expect(hasPermission("volunteer", "createDonation")).toBe(false);
    expect(hasPermission("donor", "moderateDonation")).toBe(false);
    expect(hasPermission(undefined, "requestDonation")).toBe(false);
  });
});
