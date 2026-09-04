import { z } from "zod";
import { donationCategories, donationConditions, donationUnits } from "../types/donation";

export const donationSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome do alimento."),
  category: z.enum(donationCategories, { required_error: "Selecione a categoria." }),
  quantity: z.coerce.number().positive("Informe uma quantidade maior que zero."),
  unit: z.enum(donationUnits, { required_error: "Selecione a unidade." }),
  expirationDate: z.string().min(1, "Informe a data de validade."),
  condition: z.enum(donationConditions, { required_error: "Selecione a condição." }),
  pickupLocation: z.string().trim().min(3, "Informe o local de retirada."),
  deliveryAvailable: z.enum(["true", "false"]),
  pickupDeadline: z.string().min(1, "Informe a data limite para retirada."),
  photoUrl: z.string().url("Informe uma URL válida para a foto.").optional().or(z.literal("")),
  description: z.string().trim().max(500, "Use no máximo 500 caracteres.").optional(),
});
