// model.ts — the typed data model for TypeTasks (Part 1)
let nextId = 1;
// Add a new task — always starts as "todo" with a unique id.
export function addTask(tasks, title) {
    const newTask = { id: nextId++, title, status: "todo" };
    return [...tasks, newTask];
}
// Mark the task with the matching id as "done".
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// Return only the tasks whose status matches.
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// Own addition: move a task one step forward: todo → in-progress → done.
// A task already "done" stays "done".
const nextStatus = {
    todo: "in-progress",
    "in-progress": "done",
    done: "done",
};
export function advanceTask(tasks, id) {
    return tasks.map((t) => t.id === id ? { ...t, status: nextStatus[t.status] } : t);
}
// Own addition: count how many tasks have a given status.
export function countByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status).length;
}
