import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { donationsService } from "../services/donations.service";
import type { DonationFormData } from "../types/donation";

export const donationsQueryKey = ["donations"];
export function useDonationsQuery() {
  return useQuery({
    queryKey: donationsQueryKey,
    queryFn: donationsService.list,
  });
}
export function useDonationQuery(id: string) {
  return useQuery({
    queryKey: [...donationsQueryKey, id],
    queryFn: () => donationsService.getById(id),
  });
}
export function useCreateDonationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DonationFormData) => donationsService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: donationsQueryKey }),
  });
}
