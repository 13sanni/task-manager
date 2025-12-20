interface TaskFiltersProps {
  status?: string;
  priority?: string;
  sort?: "asc" | "desc";
  onStatusChange: (value?: string) => void;
  onPriorityChange: (value?: string) => void;
  onSortChange: (value?: "asc" | "desc") => void;
}

export default function TaskFilters({
  status,
  priority,
  sort,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      {/* Status */}
      <select
        value={status ?? ""}
        onChange={(e) =>
          onStatusChange(e.target.value || undefined)
        }
      >
        <option value="">All Status</option>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      {/* Priority */}
      <select
        value={priority ?? ""}
        onChange={(e) =>
          onPriorityChange(e.target.value || undefined)
        }
      >
        <option value="">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      {/* Sort by Due Date */}
      <select
        value={sort ?? ""}
        onChange={(e) =>
          onSortChange(
            e.target.value
              ? (e.target.value as "asc" | "desc")
              : undefined
          )
        }
      >
        <option value="">No Sorting</option>
        <option value="asc">Due Date ↑</option>
        <option value="desc">Due Date ↓</option>
      </select>
    </div>
  );
}
