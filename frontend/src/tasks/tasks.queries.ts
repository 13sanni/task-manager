import { useQuery } from "@tanstack/react-query";
import { getAssignedTasksApi } from "../api/task.api";

export interface TaskFilterParams {
  status?: string;
  priority?: string;
  sort?: "asc" | "desc";
}

export const useTasks = (params: TaskFilterParams) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getAssignedTasksApi(params),
  });
};
