import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="
        flex
        flex-col
        justify-between
        overflow-hidden
        w-screen
        h-[calc(100vh-4rem)]
        bg-[var(--color-bg)]
        text-[var(--color-text)]">
      <section
        className="
          flex
          flex-col
          items-center
          justify-center
          py-24
          px-4
          text-center">
        <h1
          className="
            text-4xl
            md:text-6xl
            font-bold
            mb-4">
          Welcome to NoteKeeper
        </h1>
        <p
          className="
            text-lg
            md:text-xl
            max-w-xl
            leading-loose 
            text-[var(--color-text-muted)]">
          Keep your thoughts organized.
          <br /> Your private notebook — secure and easy.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {!isAuthenticated && (
            <Link
              to="/login"
              className="
              px-5
              py-2
              text-xl
              bg-[var(--color-secondary)]
              text-[var(--color-alice-blue)]
              rounded
              hover:bg-[var(--color-primary)]
              hover:text-[var(--color-gunmetal)]">
              Get Started
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/notes"
              className="
              px-5
              py-2
              text-xl
              bg-[var(--color-secondary)]
              text-[var(--color-alice-blue)]
              rounded
              hover:bg-[var(--color-primary)]
              hover:text-[var(--color-gunmetal)]">
              Notes
            </Link>
          )}
        </div>
      </section>
      <footer
        className="
          py-8
          text-center
          text-sm
          text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} NoteKeeper. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
