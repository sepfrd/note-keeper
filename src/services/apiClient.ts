import { API_ENDPOINTS } from "@/constants/apiEndpoints.ts";
import { CONFIG } from "@/constants/config.ts";
import { messages } from "@/constants/messages";
import { loadingManager } from "@/utils/loadingManager";
import { toastService } from "@/utils/toastService";
import axios from "axios";

const baseAxiosConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  validateStatus: () => true,
};

const apiClient = axios.create(baseAxiosConfig);

export const injectAxiosInterceptor = (getToken: () => string | null, setToken: (token: string | null) => void) => {
  apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  apiClient.interceptors.request.use(
    (config) => {
      loadingManager.show();
      return config;
    },
    (error) => {
      loadingManager.hide();
      toastService.error(messages.errors.generic);
      return Promise.reject(error);
    },
  );

  apiClient.interceptors.response.use(
    (response) => {
      loadingManager.hide();
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            API_ENDPOINTS.REFRESH_TOKEN,
            {},
            {
              baseURL: CONFIG.API_URL,
              withCredentials: true,
            },
          );
          const newToken = response.data?.data;
          if (newToken) {
            setToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient.request(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          loadingManager.hide();
        }
      }

      toastService.error(error.message || messages.errors.generic);

      loadingManager.hide();

      return Promise.reject(error);
    },
  );
};

export default apiClient;
