import {createContext,useContext} from "react";
import type{ ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/auth.api";
import type{ User } from "../types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }
  return ctx;
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    data,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    retry: false,
  });

  const user = data?.user ?? null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        refetchUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
