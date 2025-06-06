import { createContext } from "react";

export type ToastMessage = {
  type: "success" | "error" | "info" | "default";
  text: string;
};

export type ToastContextType = {
  setMessage: (msg: ToastMessage | null) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
