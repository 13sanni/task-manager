import { prisma } from "../lib/prisma";


export const findTaskById = async (taskId: string) => {
  return prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
};


export const createTask = async (data: {
  title: string;
  description?: string;
  dueDate: Date;
  priority: any;
  creatorId: string;
  assignedToId: string;
}) => {
  return prisma.task.create({
    data,
  });
};



export const updateTaskById = async (
  taskId: string,
  data: Partial<{
    title: string;
    description: string;
    dueDate: Date;
    priority: any;
    status: any;
    assignedToId: string;
  }>
) => {
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data,
  });
};
 

export const deleteTaskById = async (taskId: string) => {
  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};
