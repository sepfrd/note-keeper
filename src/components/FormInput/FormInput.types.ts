import type { CSSProperties } from "react";

export interface FormInputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  label: string;
  value: string;
  errorMessage: string;
  required: boolean;
  icon?: React.ReactElement;
  placeHolder?: string;
  validStyle?: CSSProperties;
  invalidStyle?: CSSProperties;
  isValid: (input: string) => boolean;
  setValue: (value: string) => void;
}
