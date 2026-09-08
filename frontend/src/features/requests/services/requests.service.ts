import type { DonationRequest } from "../types/request";
const requests: DonationRequest[] = [
  {
    id: "1",
    requester: "Instituto Mesa Cheia",
    foodName: "Cestas básicas",
    quantity: "3 cestas",
    status: "Pendente",
    createdAt: "04/09/2026",
  },
  {
    id: "2",
    requester: "Família Oliveira",
    foodName: "Bananas maduras",
    quantity: "4 kg",
    status: "Aceita",
    createdAt: "03/09/2026",
  },
];
export const requestsService = {
  async list() {
    return requests;
  },
  async getById(id: string) {
    return requests.find((request) => request.id === id);
  },
};
