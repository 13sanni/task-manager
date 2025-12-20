import { prisma } from "../lib/prisma.ts";
import { TaskStatus, TaskPriority } from "../../generated/prisma/enums.ts";
import type{ CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto.ts";

//create task
export const createTask = async (
  data: CreateTaskDto,
  creatorId: string
) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      creatorId,
      assignedToId: data.assignedToId,
    },
  });
};



//find user by id
export const findTaskById = async (taskId: string) => {
  return prisma.task.findUnique({
    where: { id: taskId },
  });
};



//update task
export const updateTaskById = async (
  taskId: string,
  data: UpdateTaskDto
) => {
  const updateData = {
    ...(data.title !== undefined && { title: data.title }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.dueDate !== undefined && { dueDate: data.dueDate }),
    ...(data.status !== undefined && { status: data.status }),
    ...(data.priority !== undefined && { priority: data.priority }),
  };

  return prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });
};


//delete task
export const deleteTaskById = async (taskId: string) => {
  return prisma.task.delete({
    where: { id: taskId },
  });
};


//asign task
export  const getTasksAssignedToUser = async (userId: string) => {
  return prisma.task.findMany({
    where: { assignedToId: userId },
    orderBy: { dueDate: "asc" },
  });
};



//task created by user
export const getTasksCreatedByUser = async (userId: string) => {
  return prisma.task.findMany({
    where: { creatorId: userId },
    orderBy: { dueDate: "asc" },
  });
};



//over due task
export const getOverdueTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: {
      assignedToId: userId,
      dueDate: { lt: new Date() },
      status: { not: TaskStatus.Completed },
    },
    orderBy: { dueDate: "asc" },
  });
};


interface TaskQueryOptions {
  status?: TaskStatus;
  priority?: TaskPriority;
  sortByDueDate?: "asc" | "desc";
}


 //task query builder
 export const getTasksWithFilters = async (
  where: Record<string, any>,
  options: TaskQueryOptions = {}
) => {
  return prisma.task.findMany({
    where: {
      ...where,
      ...(options.status && { status: options.status }),
      ...(options.priority && { priority: options.priority }),
    },
    ...(options.sortByDueDate && {
      orderBy: { dueDate: options.sortByDueDate },
    }),
  });
};
