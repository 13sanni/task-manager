import { useMutation } from "@tanstack/react-query";
import { createTaskApi } from "../api/task.api";
import { queryClient } from "../api/queryClient";

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
