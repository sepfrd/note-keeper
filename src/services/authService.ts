import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/types/api.types";
import type { LoginDto, SignupDto } from "@/types/auth.types";
import type { UserDto } from "@/types/user.types";
import { safeRequest } from "@/utils/safeRequest";
import apiClient from "./apiClient";

export const authService = {
  loginAsync: (loginDto: LoginDto) => safeRequest<ApiResponse<string>>(() => apiClient.post(API_ENDPOINTS.LOGIN, loginDto)),
  signupAsync: (signupDto: SignupDto) => safeRequest<ApiResponse<UserDto | void>>(() => apiClient.post(API_ENDPOINTS.SIGNUP, signupDto)),
  logoutAsync: () => safeRequest<ApiResponse<void>>(() => apiClient.post(API_ENDPOINTS.LOGOUT)),
  refreshAccessTokenAsync: () => safeRequest<ApiResponse<string>>(() => apiClient.post(API_ENDPOINTS.REFRESH_TOKEN)),
  requestGoogleOidcAsync: (redirectUri: string) => safeRequest<ApiResponse<string>>(() => apiClient.post(`${API_ENDPOINTS.OIDC_REQUEST}?redirectUri=${redirectUri}`)),
};
