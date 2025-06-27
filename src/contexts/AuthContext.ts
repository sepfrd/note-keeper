import { createContext } from "react";

export type User = {
  username: string;
  email: string;
  uuid: string;
};

export type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: User | null;
  isAuthLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
