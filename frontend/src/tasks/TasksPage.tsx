import { useState } from "react";
import { useTasks } from "./tasks.queries";
import TaskFilters from "./TaskFilters";
import TaskCard from "../dashboard/TaskCard";

export default function TasksPage() {
  const [status, setStatus] = useState<string | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [sort, setSort] = useState<"asc" | "desc" | undefined>();

  const { data, isLoading } = useTasks({
    status,
    priority,
    sort,
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <TaskFilters
        status={status}
        priority={priority}
        sort={sort}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onSortChange={setSort}
      />

      {isLoading && <p>Loading tasks...</p>}

      {!isLoading && data?.tasks.length === 0 && (
        <p className="text-gray-500">
          No tasks match the selected filters.
        </p>
      )}

      <div className="grid gap-4">
        {data?.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
