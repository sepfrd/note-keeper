import { ToastContext, type ToastMessage } from "@/contexts/ToastContext";
import { toastService } from "@/utils/toastService";
import { useEffect, useState, type ReactNode } from "react";

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  useEffect(() => {
    if (!message) {
      return;
    }

    const { type, text } = message;

    switch (type) {
      case "success":
        toastService.success(text);
        break;
      case "error":
        toastService.error(text);
        break;
      case "info":
        toastService.info(text);
        break;
      default:
        toastService.default(text);
        break;
    }

    setMessage(null);
  }, [message]);

  return <ToastContext.Provider value={{ setMessage }}>{children}</ToastContext.Provider>;
};
