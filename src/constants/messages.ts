export const messages = {
  info: {
    redirecting: "You are being redirected to",
  },
  success: {
    loginSuccess: "Logged in successfully.",
    logoutSuccess: "You have been logged out.",
  },
  errors: {
    unauthorized: "Please log in to continue.",
    badRequest: "Bad request.",
    loginError: "Invalid credentials.",
    notFound: "Resource not found.",
    internalServerError: "Server error. Please try again later.",
    generic: "Something went wrong.",
  },
  validations: {
    username: "Username must be 8–32 characters long, can include letters, numbers, and underscores, and cannot start with a number or underscore.",
    email: "Please enter a valid email address (e.g., user@example.com).",
    password: "Password must be 8–32 characters long and include at least one uppercase letter, one number, and one special character (e.g., @, #, !).",
    confirmPassword: "Confirm password must match your password.",
    usernameOrEmail: "Enter your username or email",
    loginPassword: "Enter your password.",
    emptyNote: "Note title or content cannot be empty",
  },
};
