import LoginForm from "@/components/LoginForm";
import type { LoginHandler } from "@/components/LoginForm/LoginForm.types";
import { messages } from "@/constants/messages";
import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { oauthService } from "@/services/oauthServices";
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

  return (
    <div
      className="
        m-2
        p-2
        flex
        flex-col
        overflow-hidden
        bg-[var(--color-bg)]">
      <LoginForm
        onLogin={onLogin}
        onGoogleLogin={oauthService.googleLoginAsync}
      />
    </div>
  );
};

export default Login;
