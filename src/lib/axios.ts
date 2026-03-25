import axios from "axios";
import { env } from "./env";
import { useAuthStore } from "@/features/auth/store";
import { API_ENDPOINTS } from "@/shared/constants";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  const acccessToken = useAuthStore.getState().acccessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${acccessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => {
    if (token) p.resolve(token);
    else p.reject(error);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return (response.data?.data ?? undefined)
      ? response.data.data
      : response.data;
  },
  async (error) => {
    const originalReq = error.config;
    const notAuthReq = !originalReq.url?.include("auth");
    const is401 = error.response?.status === 401;
    const notRetriedyet = !originalReq._retry;
    if (is401 && notAuthReq && notRetriedyet) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((accessToken) => {
          processQueue(null, accessToken);
          originalReq.headers.Authorization = `Bearer ${accessToken}`;
          apiClient(originalReq);
        });
      }
      isRefreshing = true;
      originalReq._retry = true;
      try {
        const res = axios.post(`${env.API_URL}${API_ENDPOINTS.AUTH.REFRESH}`);
        const newToken = res.data?.data?.acccessToken ?? res.data?.acccessToken;
        useAuthStore.getState().setAuth({
          accessToken: newToken,
          role: useAuthStore.getState().role,
        });
        processQueue(null, newToken);
        originalReq.headers.Authorization = `Bearer ${newToken}`;
        apiClient(originalReq);
      } catch (refrehsError) {
        processQueue(refrehsError, null);
        toast.error("phien dang nhap het han");
        window.location.href = "/login";
        return Promise.reject(refrehsError);
      }
    }
    const message =
      error.response?.data?.message ?? error.message ?? "co loi xay ra";
    error.message = message;
    const isLogoutEndpoint = originalReq.url?.include("/auth/logout");
    if (!isLogoutEndpoint) {
      toast.error(message);
    }
    return Promise.reject(error);
  },
);
export default apiClient;
