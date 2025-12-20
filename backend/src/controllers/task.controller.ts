import type{ Request, Response , NextFunction } from "express";
import {createTaskSchema,updateTaskSchema,} from "../dtos/task.dto.ts";
import { TaskStatus, TaskPriority } from "../../generated/prisma/enums.ts";
import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getMyAssignedTasksService,
  getMyCreatedTasksService,
  getMyOverdueTasksService,
  getMyAssignedTasksFilteredService,
} from "../services/task.service.ts";
import type{ AuthenticatedRequest } from "../middleware/auth.middleware.ts";
import { z } from "zod";

//
export const createTaskController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    const errors = z.treeifyError(result.error);

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  try {
    const task = await createTaskService(
      result.data,
      req.user!.userId
    );

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
  next(error);
}
};


 // Update a task
 
export const updateTaskController = async (
  req: AuthenticatedRequest,
  res: Response,
  next:NextFunction,
) => {
  const { taskId } = req.params;

  const result = updateTaskSchema.safeParse(req.body);

   if (!result.success) {
    const errors = z.treeifyError(result.error);

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
if (!taskId) {
  return res.status(400).json({
    message: "Task ID is required",
  });
}
  try {
    const task = await updateTaskService(
      taskId,
      req.user!.userId,
      result.data
    );

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
  next(error);

  }
};


 // Delete a task
 
export const deleteTaskController = async (
  req: AuthenticatedRequest,
  res: Response,
  next:NextFunction,
) => {
  const { taskId } = req.params;
if (!taskId) {
  return res.status(400).json({
    message: "Task ID is required",
  });
}
  try {
    await deleteTaskService(taskId, req.user!.userId);

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  }catch (error) {
  next(error);
}
};


 // Get tasks assigned to current user
 
export const getMyAssignedTasksController = async (
  req: AuthenticatedRequest,
  res: Response,

) => {
  const tasks = await getMyAssignedTasksService(req.user!.userId);

  return res.status(200).json({ tasks });
};


// Get tasks created by current user
 
export const getMyCreatedTasksController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const tasks = await getMyCreatedTasksService(req.user!.userId);

  return res.status(200).json({ tasks });
};


 // Get overdue tasks

export const getMyOverdueTasksController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const tasks = await getMyOverdueTasksService(req.user!.userId);

  return res.status(200).json({ tasks });
};



export const getMyAssignedTasksFilteredController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, priority, sort } = req.query;

    const filterOptions: Record<string, any> = {};
    if (status) filterOptions.status = status as TaskStatus;
    if (priority) filterOptions.priority = priority as TaskPriority;
    if (sort === "dueDate") filterOptions.sort = "dueDate";

    const tasks = await getMyAssignedTasksFilteredService(
      req.user!.userId,
      filterOptions
    );

    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};