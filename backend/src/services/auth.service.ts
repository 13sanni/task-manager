import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { LoginUserDto, RegisterUserDto } from "../dtos/auth.dto.ts";
import {findUserByEmail,createUser,} from "../repositories/user.repository.ts";


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




const {sign} = jwt;
export const loginUserService = async (data: LoginUserDto) => {
  const { email, password } = data;

  
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  //temp
  const token = sign(
    { userId: user.id },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};