import { createContext } from "react";

export type LoadingContextType = {
  showLoading: () => void;
  hideLoading: () => void;
  isLoading: boolean;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
