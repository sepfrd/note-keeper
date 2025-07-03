import { PATHS } from "@/constants/paths";
import Login from "@/pages/Auth/Login";
import OidcCallback from "@/pages/Auth/OidcCallback";
import Signup from "@/pages/Auth/Signup";
import Home from "@/pages/Home";
import NewNote from "@/pages/NewNote";
import Notes from "@/pages/Notes";

export const ROUTES = [
  { path: PATHS.HOME, element: <Home />, name: "Home", isProtected: false },
  { path: PATHS.LOGIN, element: <Login />, name: "Login", isProtected: false },
  { path: PATHS.SIGNUP, element: <Signup />, name: "Signup", isProtected: false },
  { path: PATHS.NOTES, element: <Notes />, name: "Notes", isProtected: true },
  { path: PATHS.NEW_NOTE, element: <NewNote />, name: "New Note", isProtected: true },
  { path: PATHS.GOOGLE_OIDC_CALLBACK, element: <OidcCallback />, name: "Google OIDC Callback", isProtected: false },
];
