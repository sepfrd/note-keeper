import { type User, AuthContext } from "@/contexts/AuthContext";
import { accessToken, setAccessToken } from "@/services/apiClient";
import { authService } from "@/services/authService";
import type { ApiResponse } from "@/types/api.types";
import type { JwtDto } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const hasRefreshed = useRef(false);

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  const login = (token: string) => {
    const decoded = jwtDecode(token);
    const jwt = decoded as JwtDto;

    const user: User = {
      username: jwt.username,
      email: jwt.email,
      uuid: jwt.uuid,
    };

    setAccessToken(token);
    setUser(user);

    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (hasRefreshed.current) {
      return;
    }

    hasRefreshed.current = true;

    const stored = localStorage.getItem("user");
    if (stored) {
      if (!accessToken) {
        authService.refreshAccessTokenAsync().then((response) => {
          if (typeof response === "object") {
            const apiResponse = response as ApiResponse<string>;
            if (apiResponse.isSuccess) {
              login(apiResponse.data);
            }
          }
        });
      }

      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};
