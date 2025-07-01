import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={PATHS.LOGIN}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
