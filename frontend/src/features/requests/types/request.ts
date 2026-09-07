export const requestStatuses = [
  "Pendente",
  "Aceita",
  "Recusada",
  "Concluída",
] as const;
export type RequestStatus = (typeof requestStatuses)[number];
export interface DonationRequest {
  id: string;
  requester: string;
  foodName: string;
  quantity: string;
  status: RequestStatus;
  createdAt: string;
}
