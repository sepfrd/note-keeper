import { createContext } from "react";

export type LoadingContextType = {
setIsLoading: (isLoading: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>
  (undefined);
