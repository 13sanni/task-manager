import type{ Task } from "../types/task";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded border p-4 space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{task.title}</h3>
        <span className="text-sm text-gray-500">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        {task.description}
      </p>

      <div className="flex gap-4 text-sm">
        <span>Status: {task.status}</span>
        <span>Priority: {task.priority}</span>
      </div>
    </div>
  );
}
