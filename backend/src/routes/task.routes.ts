import { Router } from "express";
import {
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getMyAssignedTasksController,
  getMyCreatedTasksController,
  getMyOverdueTasksController,
} from "../controllers/task.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const router = Router();

 
router.use(authMiddleware);

router.post("/", createTaskController);


router.patch("/:taskId", updateTaskController);

router.delete("/:taskId", deleteTaskController);




router.get("/assigned/me", getMyAssignedTasksController);
router.get("/created/me", getMyCreatedTasksController);
router.get("/overdue/me", getMyOverdueTasksController);

export default router;
