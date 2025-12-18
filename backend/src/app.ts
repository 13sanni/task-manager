import "dotenv/config";
import express from "express";
import testRouter from "./routes/testingRoute.ts";
import authRouter from "./routes/auth.routes.ts";
const app = express();

/* middleware */
app.use(express.json());
/* route */
app.use("/",testRouter);
app.use("/auth",authRouter);

export default app;