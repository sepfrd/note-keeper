import GoogleIcon from '@/assets/icons/google.svg?react';
import type { LoginDto } from '@/types/login.dto';
import { AtSign, EyeIcon, EyeOffIcon, Lock } from 'lucide-react';
import { useState } from 'react';
import type { LoginFormProps } from './LoginForm.types';

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [loginInfo, setLoginInfo] = useState<LoginDto>({
    usernameOrEmail: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev: LoginDto) => ({
      ...prev,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  };

  return (
    <form className="flex flex-col self-center gap-2.5 p-8 w-[450px] rounded-2xl font-sans text-[var(--color-text)] bg-[var(--color-bg)] border-2 border-[var(--color-text)]">
      <div className="flex flex-row items-center justify-between gap-2.5">
        <label>Username or Email </label>
      </div>
      <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
        <AtSign width={20} height={20} />
        <input
          name="usernameOrEmail"
          type="text"
          className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
          placeholder="Enter your username or Email"
          value={loginInfo.usernameOrEmail}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-2.5">
        <label>Password </label>
      </div>
      <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
        <Lock width={20} height={20} />
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
          placeholder="Enter your Password"
          value={loginInfo.password}
          onChange={handleChange}
        />
        <button
          type="button"
          autoFocus={false}
          className="cursor-pointer bg-transparent border-none"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOffIcon color="var(--color-text)" width={20} height={20} />
          ) : (
            <EyeIcon color="var(--color-text)" width={20} height={20} />
          )}
        </button>
      </div>
      <button
        className="
        my-5
        text-[var(--color-bg)]
        bg-[var(--color-text)]
        text-xl
        font-medium
        rounded-xl
        h-[50px]
        w-full
        cursor-pointer
        hover:border-2
        hover:bg-[var(--color-bg)]
        hover:text-[var(--color-text)]
        hover:border-[var(--color-text)]"
        onClick={(e) => {
          e.preventDefault();

          props.onLogin?.(loginInfo);
        }}
      >
        Sign In
      </button>
      <p className="text-center text-sm my-1">
        Don't have an account?{' '}
        <button
          className="text-sm ml-1 text-[var(--color-primary)] font-medium cursor-pointer"
          onClick={props.onSignup}
        >
          Sign Up
        </button>
      </p>
      <p className="text-center text-sm my-1">Or With</p>
      <div>
        <button
          className="
          flex
          flex-row
          justify-center
          items-center
          gap-2.5
          my-5
          text-[var(--color-bg)]
          bg-[var(--color-text)]
          text-xl
          rounded-xl
          h-[50px]
          w-full
          cursor-pointer
          hover:border-2
          hover:bg-[var(--color-bg)]
          hover:text-[var(--color-text)]
          hover:border-[var(--color-text)]"
          onClick={(e) => {
            e.preventDefault();
            props.onGoogleLogin?.(e);
          }}
        >
          <GoogleIcon width={25} height={25} />
          Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
