import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types";

export interface LoginPayload { email: string; password: string; rememberMe?: boolean; }
export interface RegisterPayload { name: string; email: string; phone: string; county: string; occupation: string; password: string; }
export interface AuthResponse { token: string; user: User; }

export const authService = {
  login: (data: LoginPayload) =>
    axiosInstance.post<AuthResponse>("/auth/login", data).then((r) => r.data),

  register: (data: RegisterPayload) =>
    axiosInstance.post<AuthResponse>("/auth/register", data).then((r) => r.data),

  getMe: () =>
    axiosInstance.get<User>("/auth/me").then((r) => r.data),

  updateProfile: (data: Partial<Pick<User, "name" | "phone" | "county">>) =>
    axiosInstance.patch<{ message: string; user: Partial<User> }>("/auth/me", data).then((r) => r.data),
};
