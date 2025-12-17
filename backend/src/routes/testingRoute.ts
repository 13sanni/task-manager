import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
    res.send("Hey from backend")

})
export default router;