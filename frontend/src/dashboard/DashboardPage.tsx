import TaskCard from "./TaskCard";
import {
  useAssignedTasks,
  useCreatedTasks,
  useOverdueTasks,
} from "./dashboard.queries";
import Spinner from "../components/spinner";
import EmptyState from "../components/EmptyState";

export default function DashboardPage() {
  const {
    data: assigned,
    isLoading: assignedLoading,
  } = useAssignedTasks();

  const {
    data: created,
    isLoading: createdLoading,
  } = useCreatedTasks();

  const {
    data: overdue,
    isLoading: overdueLoading,
  } = useOverdueTasks();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Assigned Tasks */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Tasks Assigned to Me
        </h2>

       {assignedLoading && <Spinner />}
        {!assignedLoading && assigned?.tasks.length === 0 && (
          <EmptyState message="No tasks assigned to you." />
        )}

        <div className="grid gap-4">
          {assigned?.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* Created Tasks */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Tasks Created by Me
        </h2>
{createdLoading && <Spinner />}
        {!createdLoading && created?.tasks.length === 0 && (
          <p className="text-gray-500">
            You haven’t created any tasks.
          </p>
        )}

        <div className="grid gap-4">
          {created?.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* Overdue Tasks */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-red-600">
          Overdue Tasks
        </h2>

        {overdueLoading && <Spinner />}
        {!overdueLoading && overdue?.tasks.length === 0 && (
          <p className="text-gray-500">
            No overdue tasks 🎉
          </p>
        )}

        <div className="grid gap-4">
          {overdue?.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
}
