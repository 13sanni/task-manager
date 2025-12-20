import axios from "./axios";
import type{ Task } from "../types/task";

export const getAssignedTasksApi = async (
  params?: {
    status?: string;
    priority?: string;
    sort?: string;
  }
): Promise<{ tasks: Task[] }> => {
  const res = await axios.get("/tasks/assigned/me", {
    params,
  });
  return res.data;
};

export const getCreatedTasksApi = async (
  params?: {
    status?: string;
    priority?: string;
    sort?: string;
  }
): Promise<{ tasks: Task[] }> => {
  const res = await axios.get("/tasks/created/me", {
    params,
  });
  return res.data;
};

export const getOverdueTasksApi = async (): Promise<{
  tasks: Task[];
}> => {
  const res = await axios.get("/tasks/overdue/me");
  return res.data;
};
export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate: string;
  priority: string;
  assignedToId: string;
}

export const createTaskApi = async (
  data: CreateTaskPayload
) => {
  const res = await axios.post("/tasks", data);
  return res.data;
};
