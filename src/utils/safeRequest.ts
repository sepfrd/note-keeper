/**
 * Wraps a request and handles errors & response standardization.
 */
export async function safeRequest<T>(requestFunction: () => Promise<{ data: T }>): Promise<T | null> {
  try {
    const response = await requestFunction();
    const apiResponse = response.data as T;
    console.log(response);
    console.log(apiResponse);
    if (apiResponse) {
      return apiResponse;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
