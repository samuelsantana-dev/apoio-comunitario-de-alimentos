import { z } from "zod";
const email = z
  .string()
  .trim()
  .min(1, "Informe seu e-mail.")
  .email("Digite um e-mail válido.");
const password = z
  .string()
  .min(1, "Informe sua senha.")
  .min(8, "A senha deve ter pelo menos 8 caracteres.");
export const loginSchema = z.object({ email, password });
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Informe seu nome.")
      .min(3, "O nome deve ter pelo menos 3 caracteres."),
    email,
    password,
    passwordConfirmation: z.string().min(1, "Confirme sua senha."),
    role: z.enum(["donor", "institution", "volunteer"], {
      required_error: "Selecione um tipo de usuário.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
  });
