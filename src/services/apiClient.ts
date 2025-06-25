import type { ApiResponse } from "@/types/api.types.ts";
import type { LoginData } from "@/types/auth.types.ts";
import axios from "axios";
import { toastService } from "../utils/toastService.ts";

const baseAxiosConfig = {
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
};

export let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const apiClient = axios.create(baseAxiosConfig);

apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post<ApiResponse<LoginData>>("/auth/refresh-token", {}, baseAxiosConfig);

        const newAccessToken = response.data.data.token;

        setAccessToken(newAccessToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        sessionStorage.clear();
        localStorage.clear();
        return Promise.reject(refreshError);
      }
    }

    const message = error?.response?.data?.message;

    if (message) {
      toastService.error(message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
