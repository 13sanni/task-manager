import { useQuery } from "@tanstack/react-query";
import {
  getAssignedTasksApi,
  getCreatedTasksApi,
  getOverdueTasksApi,
} from "../api/task.api";

export const useAssignedTasks = () => {
  return useQuery({
    queryKey: ["tasks", "assigned"],
    queryFn: () => getAssignedTasksApi(),
  });
};

export const useCreatedTasks = () => {
  return useQuery({
    queryKey: ["tasks", "created"],
    queryFn: () => getCreatedTasksApi(),
  });
};

export const useOverdueTasks = () => {
  return useQuery({
    queryKey: ["tasks", "overdue"],
    queryFn: () => getOverdueTasksApi(),
  });
};
