export type TaskStatus =
  | "ToDo"
  | "InProgress"
  | "Review"
  | "Completed";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  creatorId: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
}
