import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name);
      toast.success("Successfully created account!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090C16] flex items-center justify-center p-4">
      {/* Container Card with left absolute tab */}
      <div className="relative w-full max-w-[420px]">


        {/* Main Form Card */}
        <div className="bg-[#1C1F2E] rounded-xl border border-white/5 shadow-2xl p-8 md:p-10">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-2">
            {/* Video Camera Icon */}
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
            <span className="text-2xl font-extrabold text-white tracking-wide">NextCall</span>
          </div>

          <p className="text-gray-400 text-sm mb-6">to continue to NextCall</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-[#252A41] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 border border-white/5 focus:outline-none focus:border-blue-primary text-sm transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-[#252A41] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 border border-white/5 focus:outline-none focus:border-blue-primary text-sm transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full bg-[#252A41] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 border border-white/5 focus:outline-none focus:border-blue-primary text-sm transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-primary hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm tracking-wide mt-2 shadow-lg transition duration-200"
            >
              {loading ? "CREATING..." : "CONTINUE"}
            </button>
          </form>

          {/* Links block */}
          <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-primary hover:underline font-semibold">
                Sign in
              </Link>
            </span>
          </div>

          {/* Footer brand links */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
            <span className="hover:text-gray-400 cursor-pointer">Help</span>
            <span className="hover:text-gray-400 cursor-pointer">Privacy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
