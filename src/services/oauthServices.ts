import { CONFIG } from "@/constants/config";
import { messages } from "@/constants/messages";
import { PATHS } from "@/constants/paths";
import { authService } from "@/services/authService";
import { toastService } from "@/utils/toastService";

export const oauthService = {
  googleLoginAsync: async () => {
    const response = await authService.requestGoogleOidcAsync(CONFIG.APP_URL + PATHS.GOOGLE_OIDC_CALLBACK);

    const url = response?.isSuccess ? response.data : null;

    if (url) {
      toastService.info(messages.info.redirecting + " https://accounts.google.com/o/oauth2/auth");
      window.location.href = url;
    }
  },
};
