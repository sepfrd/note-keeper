import { type User, AuthContext } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import type { JwtDto } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";

//FIXME: fix page reload problem

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasRefreshed = useRef(false);

  const logout = () => {
    authService.logoutAsync().then(() => {
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
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setIsAuthLoading(false);
      return;
    }

    if (hasRefreshed.current) {
      setIsAuthLoading(false);
      return;
    }

    if (accessToken) {
      setIsAuthLoading(false);
      setIsAuthenticated(true);
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
  }, [accessToken]);

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
