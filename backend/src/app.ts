import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import testRouter from "./routes/testingRoute.ts";
import authRouter from "./routes/auth.routes.ts";
import taskRouter from "./routes/task.routes.ts"
import { globalErrorHandler } from "./middleware/error.middleware.ts";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
/* middleware */
app.use(express.json());
app.use(cookieParser());
/* route */
app.use("/",testRouter);
app.use("/auth",authRouter);
app.use("/tasks", taskRouter);




app.use(globalErrorHandler);

export default app;