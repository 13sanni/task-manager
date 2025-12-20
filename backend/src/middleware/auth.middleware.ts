import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/httpErrors.ts";
interface JwtPayload {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
if (!token) {
  throw new UnauthorizedError("Authentication required");
}

try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  req.user = decoded;
  next();
} catch {
  throw new UnauthorizedError("Invalid or expired token");
}}
