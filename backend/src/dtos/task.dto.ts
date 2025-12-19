import { z } from "zod";

export const taskStatusEnum = z.enum([
  "ToDo",
  "InProgress",
  "Review",
  "Completed",
]);

export const taskPriorityEnum = z.enum([
  "Low",
  "Medium",
  "High",
  "Urgent",
]);

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  dueDate: z.coerce.date(),
  priority: taskPriorityEnum,
  assignedToId: z.string().min(1),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  assignedToId: z.string().optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
