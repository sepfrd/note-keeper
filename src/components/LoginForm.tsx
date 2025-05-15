import { AtSign, EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import { useState } from "react";
import GoogleIcon from "../assets/icons/google.svg?react";
import { COLORS } from "../constants/colors";
import "/src/styles/login-form.css";

type LoginInfo = {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
};

type Props = {
  onGoogleLogin?: React.MouseEventHandler<HTMLButtonElement>;
  onLogin?: React.MouseEventHandler<HTMLButtonElement>;
  onSignup?: React.MouseEventHandler<HTMLButtonElement>;
  onForgotPassword?: React.MouseEventHandler<HTMLButtonElement>;
};

const LoginForm: React.FC<Props> = (props) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ usernameOrEmail: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev: LoginInfo) => ({
      ...prev,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  return (
    <form className="login-form">
      <div className="flex-column">
        <label>Username or Email </label>
      </div>
      <div className="login-form__input">
        <AtSign
          color={COLORS.primary}
          width={20}
          height={20}
        />
        <input
          name="usernameOrEmail"
          type="text"
          className="input"
          placeholder="Enter your username or Email"
          value={loginInfo.usernameOrEmail}
          onChange={handleChange}
        />
      </div>
      <div className="flex-column">
        <label>Password </label>
      </div>
      <div className="login-form__input">
        <Lock
          color={COLORS.primary}
          width={20}
          height={20}
        />
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="Enter your Password"
          value={loginInfo.password}
          onChange={handleChange}
        />
        <button
          type="button"
          autoFocus={false}
          className="login-form__eye-button"
          onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? (
            <EyeOffIcon
              color={COLORS.primary}
              width={20}
              height={20}
            />
          ) : (
            <EyeIcon
              color={COLORS.primary}
              width={20}
              height={20}
            />
          )}
        </button>
      </div>
      <div className="flex-row">
        <div>
          <input
            type="checkbox"
            name="rememberMe"
            onChange={handleChange}
            checked={loginInfo.rememberMe}
          />
          <label>Remember me </label>
        </div>
        <button
          className="login-form__button"
          onClick={props.onForgotPassword}>
          Forgot password?
        </button>
      </div>
      <button
        className="login-form__login-button
login-form__login-button"
        onClick={props.onLogin}>
        Sign In
      </button>
      <p className="p">
        Don't have an account?{" "}
        <button
          className="login-form__button"
          onClick={props.onSignup}>
          Sign Up
        </button>
      </p>
      <p className="p line">Or With</p>
      <div className="flex-row">
        <button
          className="login-form__google-button"
          onClick={props.onGoogleLogin}>
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
