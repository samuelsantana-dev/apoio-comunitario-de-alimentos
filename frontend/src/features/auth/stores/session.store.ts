import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { authService } from "../services/auth.service";
import type { LoginCredentials, SessionUser } from "../types/auth";
const STORAGE_KEY = "apoio:session";
function savedUser(): SessionUser | null {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "null",
    ) as SessionUser | null;
  } catch {
    return null;
  }
}
export const useSessionStore = defineStore("session", () => {
  const user = ref<SessionUser | null>(savedUser());
  const isAuthenticated = computed(() => user.value !== null);
  async function login(credentials: LoginCredentials) {
    user.value = await authService.login(credentials);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value));
  }
  function logout() {
    user.value = null;
    localStorage.removeItem(STORAGE_KEY);
  }
  return { user, isAuthenticated, login, logout };
});
