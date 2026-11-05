// app.ts — wires the typed model in model.ts to the page.
import {
  Task,
  TaskStatus,
  addTask,
  advanceTask,
  countByStatus,
  filterByStatus,
} from "./model.js";

type Filter = "all" | TaskStatus;

const FILTERS: Filter[] = ["all", "todo", "in-progress", "done"];

let tasks: Task[] = [];
let filter: Filter = "all";

// Grab elements with casts so tsc knows exactly what each one is.
const form = document.getElementById("add-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const chipsEl = document.getElementById("chips") as HTMLDivElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const emptyEl = document.getElementById("empty") as HTMLParagraphElement;

// Keep the form from reloading the page; add the typed task instead.
form.onsubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  tasks = addTask(tasks, title);
  titleInput.value = "";
  render();
};

function renderChips(): void {
  chipsEl.replaceChildren(
    ...FILTERS.map((f) => {
      const chip = document.createElement("button");
      chip.className = f === filter ? "chip active" : "chip";
      const count = f === "all" ? tasks.length : countByStatus(tasks, f);
      chip.textContent = `${f} (${count})`;
      chip.onclick = () => {
        filter = f;
        render();
      };
      return chip;
    })
  );
}

function renderList(): void {
  const visible = filter === "all" ? tasks : filterByStatus(tasks, filter);

  listEl.replaceChildren(
    ...visible.map((task) => {
      const li = document.createElement("li");
      li.className = task.status === "done" ? "task done" : "task";

      const title = document.createElement("span");
      title.className = "title";
      title.textContent = task.title;

      const badge = document.createElement("span");
      badge.className = `badge ${task.status}`;
      badge.textContent = task.status;

      li.append(title, badge);

      if (task.status !== "done") {
        const advance = document.createElement("button");
        advance.className = "advance";
        advance.textContent = "advance →";
        advance.onclick = () => {
          tasks = advanceTask(tasks, task.id);
          render();
        };
        li.append(advance);
      }

      return li;
    })
  );

  emptyEl.hidden = visible.length > 0;
}

function render(): void {
  renderChips();
  renderList();
}

render();
