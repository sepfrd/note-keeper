import { type User, AuthContext } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import type { JwtDto } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const hasRefreshed = useRef(false);

  const isAuthenticated = !!accessToken;

  const logout = () => {
    authService.logoutAsync().finally(() => {
      hasRefreshed.current = false;
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  const login = (token: string) => {
    const decoded = jwtDecode<JwtDto>(token);

    const user: User = {
      username: decoded.username,
      email: decoded.email,
      uuid: decoded.uuid,
    };

    setAccessToken(token);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setIsAuthLoading(false);
      return;
    }

    if (hasRefreshed.current || isAuthLoading === false) {
      return;
    }

    if (accessToken) {
      setIsAuthLoading(false);
      return;
    }

    hasRefreshed.current = true;

    setUser(JSON.parse(storedUser));

    if (!accessToken) {
      authService
        .refreshAccessTokenAsync()
        .then((response) => {
          if (response) {
            login(response);
          } else {
            logout();
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => setIsAuthLoading(false));
    } else {
      setIsAuthLoading(false);
    }
  }, [accessToken, isAuthLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        login,
        logout,
        accessToken,
        setAccessToken,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
