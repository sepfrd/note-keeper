import type { LoginDto } from "@/types/auth.types";

export type LoginHandler = (dto: LoginDto) => void;

export interface LoginFormProps {
  onGoogleLogin: () => Promise<void>;
  onLogin: LoginHandler;
}
