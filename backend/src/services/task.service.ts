import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto.js";
import {
  createTask, 
  findTaskById,
  updateTaskById,
  deleteTaskById,
  getTasksAssignedToUser,
  getTasksCreatedByUser,
  getOverdueTasks,
} from "../repositories/task.repository.js";


 // Create a task
 
export const createTaskService = async (
  data: CreateTaskDto,
  creatorId: string
) => {
  return createTask(data, creatorId);
};


 // Update a task with authorization rules
export const updateTaskService = async (
  taskId: string,
  userId: string,
  data: UpdateTaskDto
) => {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  // Only creator or assignee can update
  if (
    task.creatorId !== userId &&
    task.assignedToId !== userId
  ) {
    throw new Error("Not authorized to update this task");
  }

  return updateTaskById(taskId, data);
};


//  Delete a task
 
export const deleteTaskService = async (
  taskId: string,
  userId: string
) => {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  // Only creator can delete
  if (task.creatorId !== userId) {
    throw new Error("Not authorized to delete this task");
  }

  await deleteTaskById(taskId);
};

// Dashboard: tasks assigned to current user

export const getMyAssignedTasksService = async (
  userId: string
) => {
  return getTasksAssignedToUser(userId);
};


  //Dashboard: tasks created by current user
 
export const getMyCreatedTasksService = async (
  userId: string
) => {
  return getTasksCreatedByUser(userId);
};


 // Dashboard: overdue tasks
 
export const getMyOverdueTasksService = async (
  userId: string
) => {
  return getOverdueTasks(userId);
};
