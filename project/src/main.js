class project {
  constructor() {
    this.tasks = {
      todo: [],
      doing: [],
      done: [],
    };

    this.taskIdCounter = 1;
    this.draggedTask = null;
    this.init();
  }

  init() {
    this.loadTasks();
    this.setupEventListeners();
    this.setupDragAndDrop();
    this.updateTaskCounts();
  }

  setupEventListeners() {
    document
      .getElementById("todo-add")
      .addEventListener("click", () => this.addTask("todo"));
    document
      .getElementById("doing-add")
      .addEventListener("click", () => this.addTask("doing"));
    document
      .getElementById("done-add")
      .addEventListener("click", () => this.addTask("done"));

    document.getElementById("todo-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask("todo");
    });
    document.getElementById("doing-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask("doing");
    });
    document.getElementById("done-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask("done");
    });
  }

  addTask(column) {
    const input = document.getElementById(`${column}-input`).value;

    const text = input.value.trim();
    if (!text) return;

    const task = {
      id: this.taskIdCounter++,
      text: text,
      createdAt: new Date().toISOString(),
    };

    this.tasks[column].push(task);
    input.value = "";

    this.renderTasks();
    // this.saveTasks()
    // this.updateTaskCounts()
  }

  renderTasks() {
    ["todo", "doing", "done"].forEach((column) => {
      const container = document.getElementById(`${column}-tasks`);
      container.innerHTML = "";

      this.tasks[column].forEach((task) => {
        const taskElement = document.createTaskElement(task, column);
        container.appendChild(taskElement);
      });
    });
  }

  createTaskElement(task, column) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.draggable = true;
    taskDiv.dataset.taskId = task.id;
    taskDiv.dataset.column = column;

    taskDiv.innerHTML = `
      <div class="task-content">
        <p class="text-sm font-medium text-slate-900 mb-2">${this.escapeHtml(
          task.text
        )}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-500">
            ${new Date(task.createdAt).toLocaleDateString()}
          </span>
          <button class="delete-task" onclick="kanban.deleteTask(${
            task.id
          }, '${column}')">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    return taskDiv;
  }
}
