import GoogleIcon from "@/assets/icons/google.svg?react";
import { COLORS } from "@/constants/colors";
import type { LoginDto } from "@/types/login.dto";
import { AtSign, EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import { useState } from "react";
import styles from "./LoginForm.module.css";
import type { LoginFormProps } from "./LoginForm.types";

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [loginInfo, setLoginInfo] = useState<LoginDto>({ usernameOrEmail: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev: LoginDto) => ({
      ...prev,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm}>
        <div className={styles.flexRow}>
          <label>Username or Email </label>
        </div>
        <div className={styles.loginFormInput}>
          <AtSign
            color={COLORS.primary}
            width={20}
            height={20}
          />
          <input
            name="usernameOrEmail"
            type="text"
            className={styles.loginFormInput}
            placeholder="Enter your username or Email"
            value={loginInfo.usernameOrEmail}
            onChange={handleChange}
          />
        </div>
        <div className={styles.flexRow}>
          <label>Password </label>
        </div>
        <div className={styles.loginFormInput}>
          <Lock
            color={COLORS.primary}
            width={20}
            height={20}
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className={styles.loginFormInput}
            placeholder="Enter your Password"
            value={loginInfo.password}
            onChange={handleChange}
          />
          <button
            type="button"
            autoFocus={false}
            className={styles.loginFormEyeButton}
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
        <button
          className={styles.loginFormLoginButton}
          onClick={(e) => {
            e.preventDefault();

            props.onLogin?.(loginInfo);
          }}>
          Sign In
        </button>
        <p className={styles.p}>
          Don't have an account?{" "}
          <button
            className={styles.loginFormButton}
            onClick={props.onSignup}>
            Sign Up
          </button>
        </p>
        <p className={styles.p}>Or With</p>
        <div>
          <button
            className={styles.loginFormGoogleButton}
            onClick={(e) => {
              e.preventDefault();
              props.onGoogleLogin?.(e);
            }}>
            <GoogleIcon
              width={25}
              height={25}
            />
            Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
