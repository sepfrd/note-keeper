import type { LoginDto } from "@/types/login.dto";

export type LoginHandler = (dto: LoginDto) => void;

export interface LoginFormProps {
onGoogleLogin?: React.MouseEventHandler<HTMLButtonElement>;
  onLogin?: LoginHandler;
  onSignup?: React.MouseEventHandler<HTMLButtonElement>;
    }
