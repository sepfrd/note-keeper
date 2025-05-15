import axios from "axios";
import { toastService } from "../utils/toastService.ts";

const apiClient = axios.create({
  baseURL: "https://sepfrd.com/note-keeper/api",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    const message = response?.data?.message;

    if (message) {
      toastService.success(message);
    }

    return response;
  },
  (error) => {
    const message = error?.response?.data?.message;

    if (message) {
      toastService.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
