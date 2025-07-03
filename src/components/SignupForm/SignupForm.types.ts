import type { SignupDto } from "@/types/auth.types";

export type SignupHandler = (dto: SignupDto) => void;

export interface SignupFormProps {
  onGoogleLogin: () => Promise<void>;
  onSignup: SignupHandler;
}
