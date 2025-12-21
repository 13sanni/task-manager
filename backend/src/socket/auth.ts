import jwt from "jsonwebtoken";
import cookie from "cookie";
import { AuthenticatedSocket } from "./types";

interface JwtPayload {
  userId: string;
}

export const socketAuthMiddleware = (
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Authentication required"));
    }

    const cookies = cookie.parse(cookieHeader);
    const token = cookies.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    socket.userId = decoded.userId;
    next();
  } catch {
    next(new Error("Invalid or expired token"));
  }
};
