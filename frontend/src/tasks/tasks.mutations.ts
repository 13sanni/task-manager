import { useMutation } from "@tanstack/react-query";
import { createTaskApi } from "../api/task.api";
import { queryClient } from "../api/queryClient";
import { updateTaskApi } from "../api/task.api";
import type{ UpdateTaskPayload } from "../api/task.api";
import { deleteTaskApi } from "../api/task.api";


export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      // Refresh task-related queries
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};


export const useUpdateTask = () => {
  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: UpdateTaskPayload;
    }) => updateTaskApi(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};


export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (taskId: string) => deleteTaskApi(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
