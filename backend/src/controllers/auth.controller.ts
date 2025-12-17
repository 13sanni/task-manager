import { Request, Response  } from "express";
import { z } from "zod";
import { registerUserSchema } from "../dtos/auth.dto";

export const registerUser = (req: Request,res:Response)=>{
    const result = registerUserSchema.safeParse(req.body)
    

  if (!result.success) {
    const errors = z.treeifyError(result.error);

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
// this is just temp
  return res.status(201).json({
    message: "Validation passed",
    data: result.data,
  });
};