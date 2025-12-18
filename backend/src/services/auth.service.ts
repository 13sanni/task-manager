import bcrypt from "bcrypt";
import type { RegisterUserDto } from "../dtos/auth.dto.ts";
import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.ts";

export const registerUserService = async (
  data: RegisterUserDto
) => {
  const { email, password, name } = data;

  
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  
  const user = await createUser(email, hashedPassword, name);


  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
};
