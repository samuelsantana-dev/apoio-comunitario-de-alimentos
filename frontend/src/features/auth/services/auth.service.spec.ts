import { afterEach, describe, expect, it, vi } from "vitest";
import { authService } from "./auth.service";

describe("authService", () => {
  afterEach(() => {
    sessionStorage.clear();
    vi.useRealTimers();
  });

  it("identifica e-mail iniciado por admin@ como administrador", async () => {
    vi.useFakeTimers();
    const login = authService.login({
      email: "admin@teste.com",
      password: "segura123",
    });

    await vi.advanceTimersByTimeAsync(700);

    await expect(login).resolves.toMatchObject({
      email: "admin@teste.com",
      role: "admin",
    });
  });

  it("mantém o perfil escolhido no cadastro ao fazer login", async () => {
    vi.useFakeTimers();
    const register = authService.register({
      name: "Ana Voluntária",
      email: "ana@teste.com",
      password: "segura123",
      passwordConfirmation: "segura123",
      role: "volunteer",
    });
    await vi.advanceTimersByTimeAsync(700);
    await register;

    const login = authService.login({
      email: "ana@teste.com",
      password: "segura123",
    });
    await vi.advanceTimersByTimeAsync(700);

    await expect(login).resolves.toMatchObject({ role: "volunteer" });
  });
});
