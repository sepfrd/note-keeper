import LoginForm from '@/components/LoginForm';
import type { LoginHandler } from '@/components/LoginForm/LoginForm.types';
import { useAuth } from '@/hooks/useAuth';
import { accessToken } from '@/services/apiClient';
import { authService } from '@/services/authService';
import type { ApiResponse } from '@/types/api.types';
import { useEffect } from 'react';

const Login = () => {
  const { login } = useAuth();

  useEffect(() => {
    if (accessToken) {
      window.location.href = '/';
    }
  });

  const onLogin: LoginHandler = async (dto) => {
    const response = await authService.loginAsync(dto);
    if (typeof response === 'object') {
      const apiResponse = response as ApiResponse<string>;

      login(apiResponse.data);
    }
  };

  const onGoogleLogin: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const response = await authService.requestGoogleOidcAsync();
    if (typeof response === 'object') {
      const apiResponse = response as ApiResponse<string>;
      window.location.href = apiResponse.data;
    }
  };

  return (
    <div className="min-h-screen m-0 p-0 flex justify-center items-center overflow-hidden bg-[var(--color-bg)]">
      <LoginForm onLogin={onLogin} onGoogleLogin={onGoogleLogin} />
    </div>
  );
};

export default Login;
