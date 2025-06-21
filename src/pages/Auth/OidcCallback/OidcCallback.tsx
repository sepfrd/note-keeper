import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OidcCallback = () => {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      login(accessToken);
    }
    window.location.href = "/";
  }, [accessToken, login]);
  return <div className="flex w-full h-screen justify-center items-center">Redirecting...</div>;
};

export default OidcCallback;
