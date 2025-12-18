
import type{ Request,Response } from 'express';
import { z } from "zod";
import { registerUserSchema } from "../dtos/auth.dto.ts";
import { registerUserService } from '../services/auth.service.ts';


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