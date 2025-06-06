import Loader from "@/components/Loader";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useState } from "react";

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};
