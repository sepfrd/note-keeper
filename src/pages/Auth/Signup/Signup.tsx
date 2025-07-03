import SignupForm from "@/components/SignupForm";
import type { SignupHandler } from "@/components/SignupForm/SignupForm.types";
import { messages } from "@/constants/messages";
import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { oauthService } from "@/services/oauthServices";
import { toastService } from "@/utils/toastService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(PATHS.HOME);
    }
  }, [navigate, user]);

  const onSignupAsync: SignupHandler = async (dto) => {
    dto = { ...dto, firstName: dto.firstName ? dto.firstName : null, lastName: dto.lastName ? dto.lastName : null };

    const response = await authService.signupAsync(dto);

    if (response?.isSuccess) {
      toastService.success(response.message);
      navigate(PATHS.LOGIN);
    } else {
      toastService.error(response?.message || messages.errors.generic);
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
      <SignupForm
        onSignup={onSignupAsync}
        onGoogleLogin={oauthService.googleLoginAsync}
      />
    </div>
  );
};

export default Signup;
