import type{ Request, Response } from "express";
import {createTaskSchema,updateTaskSchema,} from "../dtos/task.dto.ts";
import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getMyAssignedTasksService,
  getMyCreatedTasksService,
  getMyOverdueTasksService,
} from "../services/task.service.ts";
import type{ AuthenticatedRequest } from "../middleware/auth.middleware.ts";
import { z } from "zod";

//
export const createTaskController = async (
  req: AuthenticatedRequest,
  res: Response
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
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


 // Update a task
 
export const updateTaskController = async (
  req: AuthenticatedRequest,
  res: Response
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
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


 // Delete a task
 
export const deleteTaskController = async (
  req: AuthenticatedRequest,
  res: Response
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
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


 // Get tasks assigned to current user
 
export const getMyAssignedTasksController = async (
  req: AuthenticatedRequest,
  res: Response
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
