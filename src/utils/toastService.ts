import { toast } from "react-toastify";

export const toastService = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  default: (message: string) => toast(message),
};
