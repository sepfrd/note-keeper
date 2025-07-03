export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  SIGNUP: "/users",
  REFRESH_TOKEN: "/auth/refresh-token",
  NOTES: "/notes",
  NOTES_UUID: "/notes/uuid",
  OIDC_REQUEST: "/oauth/v2/google/oidc",
} as const;
