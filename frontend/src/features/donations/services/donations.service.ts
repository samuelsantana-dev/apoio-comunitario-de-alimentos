import type { Donation, DonationFormData } from "../types/donation";

const STORAGE_KEY = "apoio:donations";
const initialDonations: Donation[] = [
  {
    id: "1",
    donorName: "Mercado Bom Vizinho",
    name: "Bananas maduras",
    category: "Hortifruti",
    quantity: 12,
    unit: "kg",
    expirationDate: "2026-09-06",
    condition: "Perecível",
    pickupLocation: "Vila Madalena, São Paulo",
    deliveryAvailable: true,
    pickupDeadline: "2026-09-05",
    status: "Disponível",
  },
  {
    id: "2",
    donorName: "Restaurante Sabor Local",
    name: "Leite integral",
    category: "Laticínios",
    quantity: 24,
    unit: "litros",
    expirationDate: "2026-09-08",
    condition: "Resfriado",
    pickupLocation: "Pinheiros, São Paulo",
    deliveryAvailable: false,
    pickupDeadline: "2026-09-06",
    status: "Reservado",
  },
  {
    id: "3",
    donorName: "Empresa Horizonte",
    name: "Cestas básicas",
    category: "Mercearia",
    quantity: 8,
    unit: "cestas",
    expirationDate: "2026-12-31",
    condition: "Não perecível",
    pickupLocation: "Centro, São Paulo",
    deliveryAvailable: true,
    pickupDeadline: "2026-09-10",
    status: "Disponível",
  },
];

function readDonations(): Donation[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as Donation[]) : initialDonations;
  } catch {
    return initialDonations;
  }
}
function saveDonations(donations: Donation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
}
const delay = () => new Promise((resolve) => setTimeout(resolve, 250));

export const donationsService = {
  async list(): Promise<Donation[]> {
    await delay();
    return readDonations();
  },
  async getById(id: string): Promise<Donation | undefined> {
    await delay();
    return readDonations().find((donation) => donation.id === id);
  },
  async create(data: DonationFormData): Promise<Donation> {
    await delay();
    const donation: Donation = {
      ...data,
      donorName: "Você",
      deliveryAvailable: Boolean(data.deliveryAvailable),
      id: crypto.randomUUID(),
      status: "Disponível",
    };
    saveDonations([donation, ...readDonations()]);
    return donation;
  },
};
