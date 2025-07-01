import GlobalToast from "@/components/GlobalToast";
import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { injectAxiosInterceptor } from "@/services/apiClient";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const { accessToken, setAccessToken } = useAuth();
  useEffect(() => {
    injectAxiosInterceptor(() => accessToken, setAccessToken);
  }, [accessToken, setAccessToken]);

  return (
    <>
      <GlobalToast />
      <NavBar />
      <Routes>
        {ROUTES.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.isProtected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
