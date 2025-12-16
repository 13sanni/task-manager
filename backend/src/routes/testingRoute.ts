import { Router , Request , Response } from "express";
const router =Router();

router.get("/",(_req:Request,res:Response)=>{
    res.send("Hey from backend")

})
export default router;