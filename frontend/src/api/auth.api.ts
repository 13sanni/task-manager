import axios from "./axios";
import type{ User } from "../types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginApi = async (data: LoginPayload) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data: RegisterPayload) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};

export const getMeApi = async (): Promise<{ user: User }> => {
  const res = await axios.get("/auth/me");
  return res.data;
};

export const logoutApi = async () => {
  const res = await axios.post("/auth/logout");
  return res.data;
};
