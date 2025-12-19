import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import testRouter from "./routes/testingRoute.ts";
import authRouter from "./routes/auth.routes.ts";
import taskRouter from "./routes/task.routes.ts"
const app = express();

/* middleware */
app.use(express.json());
app.use(cookieParser());
/* route */
app.use("/",testRouter);
app.use("/auth",authRouter);
app.use("/tasks", taskRouter);

export default app;