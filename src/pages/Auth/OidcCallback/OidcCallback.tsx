import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OidcCallback = () => {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = useMemo(() => searchParams.get("accessToken"), [searchParams]);
  const hasHandled = useRef(false);

  useEffect(() => {
    if (hasHandled.current) return;

    hasHandled.current = true;

    if (accessToken) {
      login(accessToken);
      navigate(PATHS.HOME);
    } else {
      navigate(PATHS.LOGIN);
    }
  }, [accessToken, login, navigate]);

  return <div className="flex w-full h-screen justify-center items-center">Redirecting...</div>;
};

export default OidcCallback;
