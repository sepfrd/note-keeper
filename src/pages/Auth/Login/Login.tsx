import LoginForm from "@/components/LoginForm";
import type { LoginHandler } from "@/components/LoginForm/LoginForm.types";
import { CONFIG } from "@/constants/config";
import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(PATHS.HOME);
    }
  }, [navigate, user]);

  const onLogin: LoginHandler = async (dto) => {
    const response = await authService.loginAsync(dto);
    if (response) {
      login(response);
    }
  };

  const onGoogleLogin: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const response = await authService.requestGoogleOidcAsync(CONFIG.APP_URL + PATHS.GOOGLE_OIDC_CALLBACK);

    if (response) {
      window.location.href = response;
    }
  };

  return (
    <div
      className="
        min-h-screen
        min-w-screen
        m-0
        p-0
        flex
        justify-center
        items-center
        overflow-hidden
        bg-[var(--color-bg)]">
      <LoginForm
        onLogin={onLogin}
        onGoogleLogin={onGoogleLogin}
      />
    </div>
  );
};

export default Login;
