import { useMutation } from "@tanstack/react-query";
import {
  loginApi,
  registerApi,
  logoutApi,
} from "../api/auth.api";
import type{ LoginPayload, RegisterPayload } from "../api/auth.api";
import { useAuth } from "./authContext.tsx";

export const useLogin = () => {
  const { refetchUser } = useAuth();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginApi(data),
    onSuccess: async () => {
      await refetchUser();
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerApi(data),
  });
};

export const useLogout = () => {
  const { refetchUser } = useAuth();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      await refetchUser();
    },
  });
};
