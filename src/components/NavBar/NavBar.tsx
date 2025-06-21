import { AuthContext } from "@/contexts/AuthContext";
import { AlignJustifyIcon, MoonIcon, SunIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Notes", href: "/notes" },
  { name: "About", href: "/about" },
];

export const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
  }, [auth?.user]);

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
    <nav className="fixed w-full z-50 shadow-md bg-[var(--color-bg)]">
      <div className="px-2">
        <div className="flex flex-row justify-between h-16 items-center">
          <div
            className="
              flex-shrink-0
              font-bold
              text-xl
              cursor-pointer
              select-none
              text-[var(--color-primary)]">
            NoteKeeper
          </div>

          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[var(--color-accent)] transition">
                {link.name}
              </a>
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

            {auth?.user ? (
              <>
                <span
                  className="
                    hidden
                    sm:inline
                    text-lg
                    text-[var(--color-muted)]">
                  {auth.user?.email}
                </span>
                <a
                  className="
                    text-[var(--color-bg)]
                    bg-[var(--color-accent)]
                    hidden
                    sm:inline-block
                    font-semibold
                    px-4
                    py-1
                    rounded
                    transition
                    cursor-pointer"
                  onClick={handleLogout}>
                  Logout
                </a>
              </>
            ) : (
              <a
                href="/login"
                className="
                  text-[var(--color-bg)]
                  bg-[var(--color-accent)]
                  hidden
                  sm:inline-block
                  font-semibold
                  px-4
                  py-1
                  rounded
                  transition
                  cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}>
                Login
              </a>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                md:hidden
                p-2
                rounded
                hover:bg-[var(--color-border)]
                transition"
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
              <a
                key={link.name}
                href={link.href}
                className="
                  block
                  px-3
                  py-2
                  rounded
                  hover:text-[var(--color-bg)]
                  hover:bg-[var(--color-accent)]
                  transition"
                onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            {auth?.user != null ? (
              <button
                onClick={handleLogout}
                className="
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded
                  font-semibold
                  transition
                  text-[var(--color-bg)]
                  bg-[var(--color-accent)]">
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="
                  block
                  px-3
                  py-2
                  rounded
                  font-semibold
                  transition
                  text-[var(--color-bg)]
                  bg-[var(--color-accent)]"
                onClick={() => setMobileMenuOpen(false)}>
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
