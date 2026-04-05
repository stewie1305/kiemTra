import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/shared/constants";

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

type LoginApiData = {
  accessToken: string;
  message: string;
  id: string;
  name: string;
  email: string;
  role: string;
};

export const authApi = {
  fakeLogin: async (): Promise<AuthResponse> => {
    const data = (await apiClient.get("/login/1")) as LoginApiData;

    return {
      accessToken: data.accessToken,
      message: data.message,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      },
    };
  },
};

export const authService = {
  login: async (_payload: LoginRequest): Promise<AuthResponse> => {
    void _payload;
    return authApi.fakeLogin();
  },
  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
