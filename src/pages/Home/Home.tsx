import LoginForm from "@/components/LoginForm";
import type { LoginHandler } from "@/components/LoginForm/LoginForm.types";
import { authService } from "@/services/authService";
import type { ApiResponse } from "@/types/api.types";
import type { LoginData } from "@/types/auth.types";

const Home = () => {
  const onLogin: LoginHandler = async (dto) => {
    const response = await authService.loginAsync(dto);
    if (typeof response === "object") {
      const apiResponse = response as ApiResponse<LoginData>;
      // TODO: use the response
    }
  };

  const onGoogleLogin: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const response = await authService.requestGoogleOidcAsync();
    if (typeof response === "object") {
      const apiResponse = response as ApiResponse<string>;
      // TODO: use the response
      window.location.href = apiResponse.data;
    }
  };

  return (
    <LoginForm
      onLogin={onLogin}
      onGoogleLogin={onGoogleLogin}
    />
  );
};

export default Home;
