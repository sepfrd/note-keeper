import GoogleIcon from "@/assets/icons/google.svg?react";
import FormInput from "@/components/FormInput";
import { messages } from "@/constants/messages";
import { PATHS } from "@/constants/paths";
import type { LoginDto } from "@/types/auth.types";
import { validateEmail, validatePassword, validateUsername } from "@/utils/validationHelper";
import { AtSign, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginFormProps } from "./LoginForm.types";

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [loginInfo, setLoginInfo] = useState<LoginDto>({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <form
      className="
      flex
      flex-col
      self-center
      gap-2.5
      p-8
      w-full
      md:max-w-md
      rounded-2xl
      font-sans
      text-(--color-text)
      bg-(--color-bg)
      border-2
      border-(--color-text)">
      <FormInput
        type="text"
        name="usernameOrEmail"
        label="Username or Email"
        icon={
          <AtSign
            width={20}
            height={20}
          />
        }
        placeHolder="e.g. some_username or user@example.com"
        value={loginInfo.usernameOrEmail}
        errorMessage={messages.validations.usernameOrEmail}
        required={true}
        isValid={(input) => validateUsername(input) || validateEmail(input)}
        setValue={(input) =>
          setLoginInfo((prev: LoginDto) => ({
            ...prev,
            usernameOrEmail: input,
          }))
        }
      />
      <FormInput
        type="password"
        name="password"
        label="Password"
        icon={
          <Lock
            width={20}
            height={20}
          />
        }
        placeHolder="your password"
        value={loginInfo.password}
        errorMessage={messages.validations.loginPassword}
        required={true}
        isValid={validatePassword}
        setValue={(input) =>
          setLoginInfo((prev: LoginDto) => ({
            ...prev,
            password: input,
          }))
        }
      />
      <button
        className="
        my-5
        text-(--color-bg)
        bg-(--color-text)
        text-xl
        font-medium
        rounded-xl
        h-12.5
        w-full
        cursor-pointer
        hover:border-2
        hover:bg-(--color-bg)
        hover:text-(--color-text)
        hover:border-(--color-text)"
        onClick={(e) => {
          e.preventDefault();
          props.onLogin(loginInfo);
        }}>
        Sign In
      </button>
      <p className="text-center text-sm my-1">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-sm ml-1 text-(--color-primary) font-medium cursor-pointer"
          onClick={() => navigate(PATHS.SIGNUP)}>
          Sign Up
        </button>
      </p>
      <p className="text-center text-sm my-1">Or With</p>
      <div>
        <button
          type="button"
          className="
          flex
          flex-row
          justify-center
          items-center
          gap-2.5
          my-5
          text-(--color-bg)
          bg-(--color-text)
          text-xl
          rounded-xl
          h-12.5
          w-full
          cursor-pointer
          hover:border-2
          hover:bg-(--color-bg)
          hover:text-(--color-text)
          hover:border-(--color-text)"
          onClick={(e) => {
            e.preventDefault();
            props.onGoogleLogin();
          }}>
          <GoogleIcon
            width={25}
            height={25}
          />
          Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
