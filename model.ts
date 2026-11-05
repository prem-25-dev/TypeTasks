// model.ts — the typed data model for TypeTasks (Part 1)

// A status can only ever be one of these three exact strings.
export type TaskStatus = "todo" | "in-progress" | "done";

// Every Task must have this exact shape.
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// Add a new task — always starts as "todo" with a unique id.
export function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = { id: nextId++, title, status: "todo" };
  return [...tasks, newTask];
}

// Mark the task with the matching id as "done".
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t): Task => (t.id === id ? { ...t, status: "done" } : t));
}

// Return only the tasks whose status matches.
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// Own addition: move a task one step forward: todo → in-progress → done.
// A task already "done" stays "done".
const nextStatus: Record<TaskStatus, TaskStatus> = {
  todo: "in-progress",
  "in-progress": "done",
  done: "done",
};

export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t): Task =>
    t.id === id ? { ...t, status: nextStatus[t.status] } : t
  );
}

// Own addition: count how many tasks have a given status.
export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return tasks.filter((t) => t.status === status).length;
}
