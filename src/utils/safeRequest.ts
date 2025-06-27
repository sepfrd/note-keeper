import type { ApiResponse } from "@/types/api.types";

/**
 * Wraps a request and handles errors & response standardization.
 */
export async function safeRequest<T>(requestFunction: () => Promise<{ data: ApiResponse<T> }>): Promise<T | null> {
  try {
    const response = await requestFunction();
    const apiResponse = response.data;

    if (apiResponse.isSuccess) {
      return apiResponse.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
