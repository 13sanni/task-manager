import type{ Task } from "../types/task";
import { useUpdateTask } from "../tasks/tasks.mutations";
import { useDeleteTask } from "../tasks/tasks.mutations";
import { useAuth } from "../auth/authContext.tsx";
import Button from "../components/Button.tsx";


export default function TaskCard({ task }: { task: Task }) {
  const updateTask = useUpdateTask();

  const handleStatusChange = (status: string) => {
    updateTask.mutate({
      taskId: task.id,
      data: { status },
    });
  };

  const handlePriorityChange = (priority: string) => {
    updateTask.mutate({
      taskId: task.id,
      data: { priority },
    });
  };
  const { user } = useAuth();
const deleteTask = useDeleteTask();

const isCreator = user?.id === task.creatorId;

const handleDelete = () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (confirmed) {
    deleteTask.mutate(task.id);
  }
};


  return (
    <div className="bg-white rounded border p-4 space-y-3">
      <h3 className="font-semibold">{task.title}</h3>

      <p className="text-sm text-gray-600">
        {task.description}
      </p>

      <div className="flex gap-4 text-sm">
        {/* Status */}
        <select
          value={task.status}
          onChange={(e) =>
            handleStatusChange(e.target.value)
          }
          className="border rounded px-2 py-1"
        >
          <option value="ToDo">To Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Priority */}
        <select
          value={task.priority}
          onChange={(e) =>
            handlePriorityChange(e.target.value)
          }
          className="border rounded px-2 py-1"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        {isCreator && (
  
<Button
  onClick={handleDelete}
  isLoading={deleteTask.isPending}
  className="text-red-600 text-sm"
>
  Delete
</Button>
)}

      </div>

      {updateTask.isPending && (
        <p className="text-xs text-gray-500">
          Updating...
        </p>
      )}
    </div>
  );
}
