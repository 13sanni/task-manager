import { prisma } from "../lib/prisma.ts";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  return prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
};
export const updateUserProfile = async (
  userId: string,
  data: { name?: string; email?:string }
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};
