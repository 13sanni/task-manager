import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import socketAuthMiddleware from "./auth.ts";
import type AuthenticatedSocket from "./types.ts";
let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  //  AUTHENTICATE SOCKETS
  io.use(socketAuthMiddleware);

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(
      "Socket connected:",
      socket.id,
      "User:",
      socket.userId
    );

    socket.on("disconnect", () => {
      console.log(
        "Socket disconnected:",
        socket.id,
        "User:",
        socket.userId
      );
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
