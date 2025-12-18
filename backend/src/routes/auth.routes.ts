import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { registerUser, loginUser, getProfile, updateProfile, changePassword, } from "../controllers/auth.controller.ts";


const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);


router.get("/me", authMiddleware, getProfile);


router.patch("/me", authMiddleware, updateProfile);


router.patch("/me/password", authMiddleware, changePassword);


export default router;
