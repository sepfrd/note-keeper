import GoogleIcon from "@/assets/icons/google.svg?react";
import { PATHS } from "@/constants/paths";
import { REGEX_PATTERNS } from "@/constants/regexPatterns";
import { toastService } from "@/utils/toastService";
import { AtSign, EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SignupFormProps } from "./SignupForm.types";
import FormInput from "@/components/FormInput";
import { messages } from "@/constants/messages";
import type { LoginDto, SignupDto } from "@/types/auth.types";
import { validateUsername, validateEmail, validatePassword } from "@/utils/validationHelper";

// const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onGoogleLogin }) => {
//   const [signupInfo, setSignupInfo] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const validate = () => {
//     if (!new RegExp(REGEX_PATTERNS.username).test(signupInfo.username)) {
//       return "Invalid username format.";
//     }

//     if (!new RegExp(REGEX_PATTERNS.email).test(signupInfo.email)) {
//       return "Invalid email format.";
//     }

//     if (!new RegExp(REGEX_PATTERNS.password).test(signupInfo.password)) {
//       return "Invalid password format.";
//     }

//     if (signupInfo.password !== signupInfo.confirmPassword) {
//       return "Passwords do not match.";
//     }

//     return true;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSignupInfo((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
//     }));
//   };

//   const handleSignupAsync: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
//     e.preventDefault();
//     const validationResult = validate();

//     if (validationResult === true) {
//       onSignup({
//         username: signupInfo.username,
//         password: signupInfo.password,
//         email: signupInfo.email,
//         firstName: signupInfo.firstName,
//         lastName: signupInfo.lastName,
//       });
//     } else {
//       toastService.error(validationResult);
//     }
//   };

//   return (
//     <form
//       className="
//       flex
//       flex-col
//       self-center
//       gap-2.5
//       p-8
//       w-[450px]
//       rounded-2xl
//       font-sans
//       text-[var(--color-text)]
//       bg-[var(--color-bg)]
//       border-2
//       border-[var(--color-text)]">
//       <div className="flex flex-row items-center justify-between gap-2.5">
//         <label>Username</label>
//       </div>
//       <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
//         <input
//           name="username"
//           type="text"
//           className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
//           placeholder="Your username"
//           value={signupInfo.username}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-row items-center justify-between gap-2.5">
//         <label>Email</label>
//       </div>
//       <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
//         <AtSign
//           width={20}
//           height={20}
//         />
//         <input
//           name="email"
//           type="text"
//           className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
//           placeholder="Your Email"
//           value={signupInfo.email}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-row items-center justify-between gap-2.5">
//         <label>First Name</label>
//       </div>
//       <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
//         <input
//           name="firstName"
//           type="text"
//           className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
//           placeholder="Your first name (optional)"
//           value={signupInfo.firstName}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-row items-center justify-between gap-2.5">
//         <label>Last Name</label>
//       </div>
//       <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
//         <input
//           name="lastName"
//           type="text"
//           className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
//           placeholder="Your last name (optional)"
//           value={signupInfo.lastName}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-row items-center justify-between gap-2.5">
//         <label>Password</label>
//       </div>
//       <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
//         <Lock
//           width={20}
//           height={20}
//         />
//         <input
//           name="password"
//           type={showPassword ? "text" : "password"}
//           className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
//           placeholder="your password"
//           value={signupInfo.password}
//           onChange={handleChange}
//         />
//         <button
//           type="button"
//           autoFocus={false}
//           className="cursor-pointer bg-transparent border-none"
//           onClick={() => setShowPassword((prev) => !prev)}>
//           {showPassword ? (
//             <EyeOffIcon
//               color="var(--color-text)"
//               width={20}
//               height={20}
//             />
//           ) : (
//             <EyeIcon
//               color="var(--color-text)"
//               width={20}
//               height={20}
//             />
//           )}
//         </button>
//       </div>
//       <div className="flex flex-row items-center justify-between gap-2.5">
//         <label>Confirm Password</label>
//       </div>
//       <div className="flex flex-row items-center border border-[var(--color-text)] rounded-xl p-1 transition-all duration-200 focus-within:border-[var(--color-primary)]">
//         <Lock
//           width={20}
//           height={20}
//         />
//         <input
//           name="confirmPassword"
//           type={showPassword ? "text" : "password"}
//           className="ml-2 my-1 rounded-md border-none w-[85%] h-8 focus:outline-none"
//           placeholder="Type your password again"
//           value={signupInfo.confirmPassword}
//           onChange={handleChange}
//         />
//         <button
//           type="button"
//           autoFocus={false}
//           className="cursor-pointer bg-transparent border-none"
//           onClick={() => setShowPassword((prev) => !prev)}>
//           {showPassword ? (
//             <EyeOffIcon
//               color="var(--color-text)"
//               width={20}
//               height={20}
//             />
//           ) : (
//             <EyeIcon
//               color="var(--color-text)"
//               width={20}
//               height={20}
//             />
//           )}
//         </button>
//       </div>
//       <button
//         className="
//         my-5
//         text-[var(--color-bg)]
//         bg-[var(--color-text)]
//         text-xl
//         font-medium
//         rounded-xl
//         h-[50px]
//         w-full
//         cursor-pointer
//         hover:border-2
//         hover:bg-[var(--color-bg)]
//         hover:text-[var(--color-text)]
//         hover:border-[var(--color-text)]"
//         onClick={handleSignupAsync}>
//         Sign Up
//       </button>
//       <p className="text-center text-sm my-1">
//         Already have an account?{" "}
//         <button
//           type="button"
//           className="text-sm ml-1 text-[var(--color-primary)] font-medium cursor-pointer"
//           onClick={() => navigate(PATHS.LOGIN)}>
//           Sign In
//         </button>
//       </p>
//       <p className="text-center text-sm my-1">Or With</p>
//       <div>
//         <button
//           type="button"
//           className="
//           flex
//           flex-row
//           justify-center
//           items-center
//           gap-2.5
//           my-5
//           text-[var(--color-bg)]
//           bg-[var(--color-text)]
//           text-xl
//           rounded-xl
//           h-[50px]
//           w-full
//           cursor-pointer
//           hover:border-2
//           hover:bg-[var(--color-bg)]
//           hover:text-[var(--color-text)]
//           hover:border-[var(--color-text)]"
//           onClick={(e) => {
//             e.preventDefault();
//             onGoogleLogin();
//           }}>
//           <GoogleIcon
//             width={25}
//             height={25}
//           />
//           Google
//         </button>
//       </div>
//     </form>
//   );
// };

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onGoogleLogin }) => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    if (!new RegExp(REGEX_PATTERNS.username).test(signupInfo.username)) {
      return "Invalid username format.";
    }

    if (!new RegExp(REGEX_PATTERNS.email).test(signupInfo.email)) {
      return "Invalid email format.";
    }

    if (!new RegExp(REGEX_PATTERNS.password).test(signupInfo.password)) {
      return "Invalid password format.";
    }

    if (signupInfo.password !== signupInfo.confirmPassword) {
      return "Passwords do not match.";
    }

    return true;
  };

  const handleSignupAsync: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const validationResult = validate();

    if (validationResult === true) {
      onSignup({
        username: signupInfo.username,
        password: signupInfo.password,
        email: signupInfo.email,
        firstName: signupInfo.firstName,
        lastName: signupInfo.lastName,
      });
    } else {
      toastService.error(validationResult);
    }
  };

  return (
    <form
      className="
      flex
      flex-col
      self-center
      gap-2.5
      p-8
      w-[450px]
      rounded-2xl
      font-sans
      text-[var(--color-text)]
      bg-[var(--color-bg)]
      border-2
      border-[var(--color-text)]">
      <FormInput
        type="text"
        name="username"
        label="Username"
        placeHolder="e.g. some_username"
        value={signupInfo.username}
        errorMessage={messages.validations.username}
        required={true}
        isValid={validateUsername}
        setValue={(input) =>
          setSignupInfo((prev) => ({
            ...prev,
            username: input,
          }))
        }
      />
      <FormInput
        type="email"
        name="email"
        label="Email"
        icon={
          <AtSign
            width={20}
            height={20}
          />
        }
        placeHolder="e.g. user@example.com"
        value={signupInfo.email}
        errorMessage={messages.validations.email}
        required={true}
        isValid={validateEmail}
        setValue={(input) =>
          setSignupInfo((prev) => ({
            ...prev,
            email: input,
          }))
        }
      />
      <FormInput
        type="text"
        name="firstName"
        label="First Name"
        placeHolder="optional"
        value={signupInfo.firstName}
        errorMessage=""
        required={false}
        isValid={() => true}
        setValue={(input) =>
          setSignupInfo((prev) => ({
            ...prev,
            firstName: input,
          }))
        }
      />
      <FormInput
        type="text"
        name="lastName"
        label="Last Name"
        placeHolder="optional"
        value={signupInfo.lastName}
        errorMessage=""
        required={false}
        isValid={() => true}
        setValue={(input) =>
          setSignupInfo((prev) => ({
            ...prev,
            lastName: input,
          }))
        }
      />
      <FormInput
        type="password"
        name="password"
        label="Password"
        icon={
          <Lock
            width={20}
            height={20}
          />
        }
        placeHolder="a strong password"
        value={signupInfo.password}
        errorMessage={messages.validations.password}
        required={true}
        isValid={validatePassword}
        setValue={(input) =>
          setSignupInfo((prev) => ({
            ...prev,
            password: input,
          }))
        }
      />
      <FormInput
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        icon={
          <Lock
            width={20}
            height={20}
          />
        }
        placeHolder="enter your password again"
        value={signupInfo.confirmPassword}
        errorMessage={messages.validations.confirmPassword}
        required={true}
        isValid={() => signupInfo.password === signupInfo.confirmPassword}
        setValue={(input) =>
          setSignupInfo((prev) => ({
            ...prev,
            confirmPassword: input,
          }))
        }
      />
      <button
        className="
        my-5
        text-[var(--color-bg)]
        bg-[var(--color-text)]
        text-xl
        font-medium
        rounded-xl
        h-[50px]
        w-full
        cursor-pointer
        hover:border-2
        hover:bg-[var(--color-bg)]
        hover:text-[var(--color-text)]
        hover:border-[var(--color-text)]"
        onClick={handleSignupAsync}>
        Sign Up
      </button>
      <p className="text-center text-sm my-1">
        Already have an account?{" "}
        <button
          type="button"
          className="text-sm ml-1 text-[var(--color-primary)] font-medium cursor-pointer"
          onClick={() => navigate(PATHS.LOGIN)}>
          Sign In
        </button>
      </p>
      <p className="text-center text-sm my-1">Or With</p>
      <div>
        <button
          type="button"
          className="
          flex
          flex-row
          justify-center
          items-center
          gap-2.5
          my-5
          text-[var(--color-bg)]
          bg-[var(--color-text)]
          text-xl
          rounded-xl
          h-[50px]
          w-full
          cursor-pointer
          hover:border-2
          hover:bg-[var(--color-bg)]
          hover:text-[var(--color-text)]
          hover:border-[var(--color-text)]"
          onClick={(e) => {
            e.preventDefault();
            onGoogleLogin();
          }}>
          <GoogleIcon
            width={25}
            height={25}
          />
          Google
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
