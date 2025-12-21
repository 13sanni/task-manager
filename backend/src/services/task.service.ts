import type{ CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto.ts";
import {NotFoundError,ForbiddenError,} from "../errors/httpErrors.ts";
import { TaskStatus, TaskPriority } from "../../generated/prisma/enums.ts";
import { getTasksWithFilters } from "../repositories/task.repository.ts";
import { getIO } from "../socket";

import {
  createTask, 
  findTaskById,
  updateTaskById,
  deleteTaskById,
  getTasksAssignedToUser,
  getTasksCreatedByUser,
  getOverdueTasks,
} from "../repositories/task.repository.ts";


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
    throw new NotFoundError("Task not found");
  }

  if (
    task.creatorId !== userId &&
    task.assignedToId !== userId
  ) {
    throw new ForbiddenError("Not authorized to update this task");
  }

  return updateTaskById(taskId, data);
};
;


//  Delete a task
 
export const deleteTaskService = async (
  taskId: string,
  userId: string
) => {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  if (task.creatorId !== userId) {
    throw new ForbiddenError("Not authorized to delete this task");
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



interface TaskFilterOptions {
   status?: TaskStatus;
   priority?: TaskPriority;
    sort?: "dueDate"; }



export const getMyAssignedTasksFilteredService = async (
  userId: string,
  filters: TaskFilterOptions
) => {
  const queryOptions: any = {};
  if (filters.status !== undefined) queryOptions.status = filters.status;
  if (filters.priority !== undefined) queryOptions.priority = filters.priority;
  if (filters.sort) queryOptions.sortByDueDate = "asc";

  return getTasksWithFilters(
    { assignedToId: userId },
    queryOptions
  );
};

export const getMyCreatedTasksFilteredService = async (
  userId: string,
  filters: TaskFilterOptions
) => {
  const queryOptions: any = {};
  if (filters.status !== undefined) queryOptions.status = filters.status;
  if (filters.priority !== undefined) queryOptions.priority = filters.priority;
  if (filters.sort) queryOptions.sortByDueDate = "asc";

  return getTasksWithFilters(
    { creatorId: userId },
    queryOptions
  );
};
