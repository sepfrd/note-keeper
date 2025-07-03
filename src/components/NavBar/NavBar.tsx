import { PATHS } from "@/constants/paths";
import { AuthContext } from "@/contexts/AuthContext";
import NewNote from "@/pages/NewNote";
import Notes from "@/pages/Notes";
import { AlignJustifyIcon, Home, MoonIcon, SunIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { path: PATHS.HOME, element: <Home />, name: "Home", isProtected: false },
  { path: PATHS.NOTES, element: <Notes />, name: "Notes", isProtected: true },
  { path: PATHS.NEW_NOTE, element: <NewNote />, name: "New Note", isProtected: true },
];

export const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    auth?.logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="
          fixed
          top-0
          w-full
          z-50
          shadow-md
          bg-[var(--color-bg)]">
        <div className="px-2">
          <div
            className="
            flex
            flex-row
            justify-between
            h-16
            items-center">
            <Link
              to="/"
              className="
              flex-shrink-0
              font-bold
              text-xl
              select-none
              text-[var(--color-secondary)]
              hover:text-[var(--color-primary)]">
              NoteKeeper
            </Link>
            <div className="hidden md:flex space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-[var(--color-primary)] transition">
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-row items-center space-x-4">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="
                p-2
                rounded
                hover:bg-[var(--color-border)]
                transition
                cursor-pointer"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
                {theme === "light" ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              </button>

              {auth?.isAuthenticated ? (
                <>
                  <span
                    className="
                    hidden
                    sm:inline
                    text-lg
                    text-[var(--color-muted)]">
                    {auth.user?.email}
                  </span>
                  <button
                    className="
                    bg-[var(--color-primary)]
                    hover:bg-[var(--color-secondary)]
                    text-[var(--color-bg)]
                    font-semibold
                    px-4
                    py-1
                    rounded
                    transition
                    cursor-pointer"
                    onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="
                  bg-[var(--color-primary)]
                  hover:bg-[var(--color-secondary)]
                  text-[var(--color-bg)]
                  font-semibold
                  px-4
                  py-1
                  rounded
                  transition
                  cursor-pointer"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(PATHS.LOGIN);
                  }}>
                  Login
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`
                  md:hidden
                  p-2
                  rounded
                  hover:bg-[var(--color-border)]
                  transition
                  ${mobileMenuOpen && "bg-[var(--color-border)]"}`}
                aria-label="Toggle menu">
                <AlignJustifyIcon />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="
            md:hidden
            border-t
            border-[var(--color-border)]
            bg-[var(--color-bg)]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  to={link.path}
                  className="
                  block
                  px-3
                  py-2
                  rounded
                  hover:text-[var(--color-bg)]
                  hover:bg-[var(--color-primary)]
                  transition"
                  onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
};

export default NavBar;
