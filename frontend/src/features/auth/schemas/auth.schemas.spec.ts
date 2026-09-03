import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./auth.schemas";

describe("auth schemas", () => {
  it("rejeita login com e-mail inválido e senha curta", () => {
    const result = loginSchema.safeParse({
      email: "invalido",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  it("aceita cadastro dos perfis públicos", () => {
    const result = registerSchema.safeParse({
      name: "Maria Silva",
      email: "maria@exemplo.com",
      password: "segura123",
      passwordConfirmation: "segura123",
      role: "volunteer",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita administrador e senhas diferentes", () => {
    const result = registerSchema.safeParse({
      name: "Maria Silva",
      email: "maria@exemplo.com",
      password: "segura123",
      passwordConfirmation: "outra123",
      role: "admin",
    });
    expect(result.success).toBe(false);
  });
});
