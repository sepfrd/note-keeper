import type { ApiResponse } from "@/types/api.types";
import type { LoginData } from "@/types/auth.types";
import type { LoginDto } from "@/types/login.dto";
import apiClient from "./apiClient";

export const authService = {
  loginAsync: async (loginDto: LoginDto): Promise<ApiResponse<LoginData> | unknown> => {
    try {
      const response = await apiClient.post<ApiResponse<LoginData>>("/auth/login", loginDto);
      return response.data;
    } catch (error: unknown) {
      return error;
    }
  },
  refreshAccessTokenAsync: async (): Promise<ApiResponse<LoginData> | unknown> => {
    try {
      const response = await apiClient.post<ApiResponse<LoginData>>("/auth/refresh-token");
      return response.data;
    } catch (error: unknown) {
      return error;
    }
  },
  requestGoogleOidcAsync: async (redirectUri: string): Promise<ApiResponse<string> | unknown> => {
    try {
      const response = await apiClient.post<ApiResponse<string>>(`/oauth/v2/google/oidc?redirectUri=${redirectUri}`);
      return response.data;
    } catch (error: unknown) {
      return error;
    }
  },
};
