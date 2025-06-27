import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--color-bg)]
        text-[var(--color-text)]
        transition-colors
        duration-300">
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
            text-[var(--color-text-muted)]">
          Keep your thoughts organized. Sync with Notion or use your private notebook — securely and easily.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="
              px-6
              py-3
              bg-[var(--color-primary)]
              text-[var(--color-bg)]
              rounded-xl
              font-medium
              hover:opacity-90">
            Get Started
          </Link>

          <Link
            to="/notes"
            className="
              px-6
              py-3
              bg-[var(--color-primary)]
              text-[var(--color-bg)]
              rounded-xl
              font-medium
              hover:opacity-90">
            Notes
          </Link>
        </div>
      </section>

      <section
        id="features"
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
          px-8
          py-16
          bg-[var(--color-bg-alt)]">
        <FeatureCard
          title="Native Notes"
          description="Create and manage notes locally with full-text support and tagging."
        />
        <FeatureCard
          title="Notion Sync"
          description="Import and sync your Notion notes seamlessly with your NoteKeeper."
        />
        <FeatureCard
          title="Secure Login"
          description="Sign in with Google securely via OAuth2/OpenID Connect."
        />
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

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div
    className="
  p-6
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-bg)]
        shadow-sm">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-[var(--color-text-muted)]">{description}</p>
  </div>
);

export default Home;
