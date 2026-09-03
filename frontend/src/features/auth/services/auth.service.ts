import type {
  LoginCredentials,
  RegisterData,
  SessionUser,
} from "../types/auth";
const wait = (milliseconds = 700) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
export const authService = {
  async login(credentials: LoginCredentials): Promise<SessionUser> {
    await wait();
    return {
      name: credentials.email.split("@")[0] || "Usuário",
      email: credentials.email,
      role: "donor",
    };
  },
  async register(data: RegisterData): Promise<void> {
    await wait();
    sessionStorage.setItem("apoio:registered-email", data.email);
  },
};
