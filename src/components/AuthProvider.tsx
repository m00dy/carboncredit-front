"use client";

import React, {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    let nextToken: string | null = null;
    let nextUser: User | null = null;

    try {
      const storedToken = localStorage.getItem("cc_token");
      const storedUser = localStorage.getItem("cc_user");
      if (storedToken && storedUser) {
        nextToken = storedToken;
        nextUser = JSON.parse(storedUser);
      }
    } catch {
      // corrupted storage – clear it
      localStorage.removeItem("cc_token");
      localStorage.removeItem("cc_user");
    }

    startTransition(() => {
      setToken(nextToken);
      setUser(nextUser);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem("cc_token", newToken);
    localStorage.setItem("cc_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
