import { createContext } from "react";

export type User = {
  username: string;
  email: string;
  uuid: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
