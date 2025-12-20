import type{ Request, Response, NextFunction } from "express";
import { AppError } from "../errors/Apperror.ts";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Known (operational) errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Unknown errors (programming / bugs)
  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
