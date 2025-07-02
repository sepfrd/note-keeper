import LoginForm from "@/components/LoginForm";
import type { LoginHandler } from "@/components/LoginForm/LoginForm.types";
import { CONFIG } from "@/constants/config";
import { messages } from "@/constants/messages";
import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { toastService } from "@/utils/toastService";
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
    const token = response?.isSuccess ? response.data : null;
    if (token) {
      login(token);
      toastService.success(messages.success.loginSuccess);
    } else {
      toastService.error(response?.message || messages.errors.generic);
    }
  };

  const onGoogleLogin: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const response = await authService.requestGoogleOidcAsync(CONFIG.APP_URL + PATHS.GOOGLE_OIDC_CALLBACK);

    const url = response?.isSuccess ? response.data : null;

    if (url) {
      toastService.info(messages.info.redirecting + " https://accounts.google.com/o/oauth2/auth");
      window.location.href = url;
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
