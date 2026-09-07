import { useQuery } from "@tanstack/vue-query";
import { requestsService } from "../services/requests.service";
export const useRequestsQuery = () =>
  useQuery({ queryKey: ["requests"], queryFn: requestsService.list });
export const useRequestQuery = (id: string) =>
  useQuery({
    queryKey: ["requests", id],
    queryFn: () => requestsService.getById(id),
  });
