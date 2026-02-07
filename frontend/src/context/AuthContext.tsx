"use client";

import { createContext, useContext, useEffect, useState } from "react";
import AuthApi, { MeResponse } from "@/services/authApi";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: MeResponse | null;
  isLoading: boolean;
  isAdmin: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAdmin = user?.roles?.some((r) => r.authority === "ROLE_ADMIN") ?? false;

  const checkAuth = async () => {
    setIsLoading(true);
    const userData = await AuthApi.me();
    setUser(userData);
    setIsLoading(false);
  };

  const logout = async () => {
    await AuthApi.logout();
    setUser(null);
    router.push("/admin/login");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
