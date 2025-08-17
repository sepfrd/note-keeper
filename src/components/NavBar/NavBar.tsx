import Button from "@/components/Button";
import { PATHS } from "@/constants/paths";
import { AuthContext } from "@/contexts/AuthContext";
import NewNote from "@/pages/NewNote";
import Notes from "@/pages/Notes";
import { Home, Menu, MoonIcon, SunIcon, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { path: PATHS.HOME, element: <Home />, name: "Home", isProtected: false },
  { path: PATHS.NOTES, element: <Notes />, name: "Notes", isProtected: true },
  { path: PATHS.NEW_NOTE, element: <NewNote />, name: "New Note", isProtected: true },
];

export const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const { pathname } = useLocation();
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
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav
        className={`
          bg-[var(--color-bg)]      
          border-none
          fixed
          top-0
          w-full
          z-50
          ${!isMenuOpen && "shadow-md"}`}>
        <div className="px-2">
          <div
            className="
            w-full
            flex
            flex-row-reverse
            justify-between
            h-16
            items-center">
            {/* <Link
              to="/"
              className="
              hidden
              md:inline
              flex-shrink-0
              font-bold
              text-xl
              select-none
              text-[var(--color-secondary)]
              hover:text-[var(--color-primary)]">
              NoteKeeper
            </Link> */}
            <div
              className="
                hidden
                md:flex
                flex-row
                grow
                space-x-8
                justify-center
                items-center">
              <div>
                {auth?.isAuthenticated ? (
                  <Button
                    className="
                    px-5
                    py-2
                    block
                    w-full
                    rounded-lg
                    text-center
                    cursor-pointer
                    hover:bg-[var(--color-primary)]
                    hover:text-[var(--color-bg)]"
                    onClick={handleLogout}
                    label="Logout"
                  />
                ) : (
                  <Button
                    className={`
                      px-5
                      py-2
                      block
                      w-full
                      text-center
                      rounded-lg
                      ${pathname !== PATHS.LOGIN && "hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]"}
                      ${pathname === PATHS.LOGIN && "bg-slate-500"}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(PATHS.LOGIN);
                    }}
                    label="Login"
                  />
                )}
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      w-max
                      block
                      py-2
                      px-5
                      rounded-lg
                      ${!isActive && "hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]"}
                      ${isActive && "bg-[var(--color-highlight)]"}`}>
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div
              className="
                flex
                flex-row
                md:grow-0
                grow
                w-max
                justify-between
                items-center
                space-x-4">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="
                p-2
                rounded-full
                hover:bg-[var(--color-border)]
                cursor-pointer"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
                {theme === "light" ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  p-2
                  rounded-full
                  md:hidden
                  transition-all
                  duration-1000
                  ${isMenuOpen && "bg-slate-700 text-[var(--color-alice-blue)]"}`}
                aria-label="Toggle menu">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="
            md:hidden
            flex
            flex-col
            mx-1
            p-1
            rounded-2xl
            text-center
            overflow-hidden
            bg-[var(--color-bg-secondary)]">
            <div>
              <div>
                {auth?.isAuthenticated ? (
                  <Button
                    className="
                    px-3
                    py-2
                    block
                    w-full
                    cursor-pointer"
                    onClick={handleLogout}
                    label="Logout"
                  />
                ) : (
                  <Button
                    className={`
                      px-3
                      py-2
                      block
                      w-full
                      text-center
                      ${pathname === PATHS.LOGIN && "bg-slate-500 rounded-xl"}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(PATHS.LOGIN);
                    }}
                    label="Login"
                  />
                )}
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    to={link.path}
                    className={`
                      block
                      py-2
                    ${isActive && "bg-[var(--color-highlight)] rounded-xl"}`}
                    onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </div>
  );
};

export default NavBar;
