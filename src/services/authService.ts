import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { safeRequest } from "@/utils/safeRequest";
import apiClient from "./apiClient";
import type { LoginDto } from "@/types/auth.types";

export const authService = {
  loginAsync: (loginDto: LoginDto) => safeRequest<string>(() => apiClient.post(API_ENDPOINTS.LOGIN, loginDto)),
  logoutAsync: () => safeRequest(() => apiClient.post(API_ENDPOINTS.LOGOUT)),
  refreshAccessTokenAsync: () => safeRequest<string>(() => apiClient.post(API_ENDPOINTS.REFRESH_TOKEN)),
  requestGoogleOidcAsync: (redirectUri: string) => safeRequest<string>(() => apiClient.post(`${API_ENDPOINTS.OIDC_REQUEST}?redirectUri=${redirectUri}`)),
};
