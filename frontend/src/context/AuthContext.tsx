import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth";

interface AuthContextType {
  user: User | null;

  login: (user: User, token: string) => void;

  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
