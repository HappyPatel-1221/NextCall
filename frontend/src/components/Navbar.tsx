import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav className="fixed z-50 w-full bg-white dark:bg-dark-1 px-6 py-4 lg:px-10 border-b border-gray-200 dark:border-white/5 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-blue-primary p-2 rounded-lg">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-[26px] font-extrabold text-gray-900 dark:text-white max-sm:hidden">
          NextCall
        </p>
      </Link>

      <div className="flex items-center gap-5">
        <ThemeToggle />
        <button
          onClick={logout}
          className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-primary dark:hover:text-blue-primary transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
