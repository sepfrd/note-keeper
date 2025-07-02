import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/types/api.types";
import type { LoginDto } from "@/types/auth.types";
import { safeRequest } from "@/utils/safeRequest";
import apiClient from "./apiClient";

export const authService = {
  loginAsync: (loginDto: LoginDto) => safeRequest<ApiResponse<string>>(() => apiClient.post(API_ENDPOINTS.LOGIN, loginDto)),
  logoutAsync: () => safeRequest<ApiResponse<void>>(() => apiClient.post(API_ENDPOINTS.LOGOUT)),
  refreshAccessTokenAsync: () => safeRequest<ApiResponse<string>>(() => apiClient.post(API_ENDPOINTS.REFRESH_TOKEN)),
  requestGoogleOidcAsync: (redirectUri: string) => safeRequest<ApiResponse<string>>(() => apiClient.post(`${API_ENDPOINTS.OIDC_REQUEST}?redirectUri=${redirectUri}`)),
};
