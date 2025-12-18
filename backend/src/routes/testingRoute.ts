import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const router = Router();

router.get("/", (_req, res) => {
  res.send("hello from backend");
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
  });
});

export default router;
