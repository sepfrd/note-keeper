import { API_ENDPOINTS } from "@/constants/apiEndpoints.ts";
import { CONFIG } from "@/constants/config.ts";
import axios from "axios";

const baseAxiosConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const apiClient = axios.create(baseAxiosConfig);

export const injectAuthInterceptor = (getToken: () => string | null, setToken: (token: string | null) => void) => {
  apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            API_ENDPOINTS.REFRESH_TOKEN,
            {},
            {
              baseURL: CONFIG.API_BASE_URL,
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
        }
      }

      return Promise.reject(error);
    },
  );
};

export default apiClient;
