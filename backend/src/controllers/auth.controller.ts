import type { AuthenticatedRequest } from "../middleware/auth.middleware.ts";
import type{ Request,Response,NextFunction } from 'express';
import { z } from "zod";
import { registerUserSchema,loginUserSchema, updateProfileSchema,changePasswordSchema } from "../dtos/auth.dto.ts";
import { registerUserService,loginUserService ,updateProfileService,changePasswordService,getProfileService} from '../services/auth.service.ts';


export const registerUser =async (req: Request,res:Response,next:NextFunction)=>{
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
  }catch (error) {
  next(error);
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




export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = await getProfileService(req.user!.userId);

    return res.status(200).json({
      user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};








export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const result = updateProfileSchema.safeParse(req.body);
 if (!result.success) {
    const errors = z.treeifyError(result.error);

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  try {
    const user = await updateProfileService(
      req.user!.userId,
      result.data
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const result = changePasswordSchema.safeParse(req.body);
if (!result.success) {
    const errors = z.treeifyError(result.error);

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  try {
    await changePasswordService(
      req.user!.userId,
      result.data
    );

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
