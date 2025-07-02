import Loader from "@/components/Loader";
import { LoadingContext } from "@/contexts/LoadingContext";
import { loadingManager } from "@/utils/loadingManager";
import { useState } from "react";

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  loadingManager.set(showLoading, hideLoading);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};
