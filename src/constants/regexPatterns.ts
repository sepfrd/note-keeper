export const REGEX_PATTERNS = {
  username: "^(?![\\d_])[\\w\\d_]{8,32}$",
  email: "^[\\w.-]{1,64}@[\\w.-]{1,251}\\.[\\w]{2,4}$",
  password: "^(?=.*[A-Z])(?=.*\\d)(?=.*[.,!@#$%^&*()_+])[A-Za-z\\d.,!@#$%^&*()_+]{8,32}$",
} as const;
