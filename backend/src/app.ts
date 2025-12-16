import "dotenv/config";
import express from "express";
import router from "./routes/testingRoute.ts";
const app = express();

/* middleware */
app.use(express.json());
/* route */
app.use("/",router);

export default app;