import { toast } from "react-toastify";

const toMultilineString = (raw: string) => raw.replace(/\\n/g, "\n");

export const toastService = {
  success: (message: string) => toast.success(toMultilineString(message)),
  error: (message: string) => toast.error(toMultilineString(message)),
  info: (message: string) => toast.info(toMultilineString(message)),
  default: (message: string) => toast(toMultilineString(message)),
};
