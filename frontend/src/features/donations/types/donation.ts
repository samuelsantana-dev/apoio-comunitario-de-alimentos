export const donationCategories = [
  "Hortifruti",
  "Padaria",
  "Laticínios",
  "Refeições prontas",
  "Mercearia",
] as const;
export const donationUnits = [
  "kg",
  "litros",
  "unidades",
  "caixas",
  "cestas",
] as const;
export const donationConditions = [
  "Lacrado",
  "Resfriado",
  "Congelado",
  "Perecível",
  "Não perecível",
] as const;
export const donationStatuses = [
  "Disponível",
  "Reservado",
  "Retirado",
  "Entregue",
  "Expirado",
  "Cancelado",
] as const;

export type DonationCategory = (typeof donationCategories)[number];
export type DonationUnit = (typeof donationUnits)[number];
export type DonationCondition = (typeof donationConditions)[number];
export type DonationStatus = (typeof donationStatuses)[number];

export interface Donation {
  id: string;
  donorName: string;
  name: string;
  category: DonationCategory;
  quantity: number;
  unit: DonationUnit;
  expirationDate: string;
  condition: DonationCondition;
  pickupLocation: string;
  deliveryAvailable: boolean;
  pickupDeadline: string;
  photoUrl?: string;
  description?: string;
  status: DonationStatus;
}

export type DonationFormData = Omit<Donation, "id" | "status">;
