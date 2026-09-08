import type {
  LoginCredentials,
  RegisterData,
  SessionUser,
} from "../types/auth";
const wait = (milliseconds = 700) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
const REGISTERED_USER_KEY = "apoio:registered-user";
export const authService = {
  async login(credentials: LoginCredentials): Promise<SessionUser> {
    await wait();
    const registeredUser = JSON.parse(sessionStorage.getItem(REGISTERED_USER_KEY) ?? "null") as SessionUser | null;
    const role = credentials.email.startsWith("admin@") ? "admin" : registeredUser?.email === credentials.email ? registeredUser.role : "donor";
    return {
      name: credentials.email.split("@")[0] || "Usuário",
      email: credentials.email,
      role,
    };
  },
  async register(data: RegisterData): Promise<void> {
    await wait();
    sessionStorage.setItem("apoio:registered-email", data.email);
    sessionStorage.setItem(REGISTERED_USER_KEY, JSON.stringify({ name: data.name, email: data.email, role: data.role }));
  },
};
