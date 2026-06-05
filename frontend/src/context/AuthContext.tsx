import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("nextcall_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("nextcall_token");
      if (savedToken) {
        try {
          const userData = await apiFetch("/auth/me");
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          console.error("Token verification failed:", error);
          // Clean up invalid token
          localStorage.removeItem("nextcall_token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("nextcall_token", data.token);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const data = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });
      localStorage.setItem("nextcall_token", data.token);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("nextcall_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
