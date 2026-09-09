import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "./session.store";

describe("session store", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  it("persiste a sessão após login e a remove ao sair", async () => {
    const session = useSessionStore();
    const login = session.login({
      email: "admin@teste.com",
      password: "segura123",
    });
    await vi.advanceTimersByTimeAsync(700);
    await login;

    expect(session.isAuthenticated).toBe(true);
    expect(session.user?.role).toBe("admin");
    expect(
      JSON.parse(localStorage.getItem("apoio:session") ?? "null"),
    ).toMatchObject({
      email: "admin@teste.com",
    });

    session.logout();

    expect(session.isAuthenticated).toBe(false);
    expect(localStorage.getItem("apoio:session")).toBeNull();
  });
});
