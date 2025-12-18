
import type{ Request,Response } from 'express';
import { z } from "zod";
import { registerUserSchema,loginUserSchema } from "../dtos/auth.dto.ts";
import { registerUserService,loginUserService } from '../services/auth.service.ts';


export const registerUser =async (req: Request,res:Response)=>{
    const result = registerUserSchema.safeParse(req.body)
    

  if (!result.success) {
    const errors = z.treeifyError(result.error);

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  try {
    const user = await registerUserService(result.data);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};




export const loginUser = async (req: Request, res: Response) => {
  const result = loginUserSchema.safeParse(req.body);

  if (!result.success) {
     const errors = z.treeifyError(result.error);
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
 try {
    const { token, user } = await loginUserService(result.data);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};