import { useForm } from "react-hook-form";
import { useCreateTask } from "../tasks.mutations.ts";

interface CreateTaskFormData {
  title: string;
  description?: string;
  dueDate: string;
  priority: string;
  assignedToId: string;
}

export default function CreateTaskForm() {
  const { register, handleSubmit, reset } =
    useForm<CreateTaskFormData>();

  const createTask = useCreateTask();

  const onSubmit = (data: CreateTaskFormData) => {
    createTask.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded border space-y-3"
    >
      <h2 className="font-semibold">Create Task</h2>

      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="border px-3 py-2 w-full rounded"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="border px-3 py-2 w-full rounded"
      />

      <input
        type="date"
        {...register("dueDate", { required: true })}
        className="border px-3 py-2 w-full rounded"
      />

      <select
        {...register("priority")}
        className="border px-3 py-2 w-full rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>

      <input
        {...register("assignedToId")}
        placeholder="Assign to userId"
        className="border px-3 py-2 w-full rounded"
      />

      <button
        type="submit"
        disabled={createTask.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {createTask.isPending ? "Creating..." : "Create"}
      </button>

      {createTask.isError && (
        <p className="text-red-600 text-sm">
          Failed to create task
        </p>
      )}
    </form>
  );
}
