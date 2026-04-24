const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const API_URL = "http://localhost:3000/tasks";

// Fetch tasks from database on load
async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    taskList.innerHTML = "";
    tasks.forEach(task => renderTask(task));
    updateCounts();
}

// Update task counters based on DOM
function updateCounts() {
    const tasks = document.querySelectorAll("#taskList li");
    const completedTasks = document.querySelectorAll("#taskList li.completed");

    pendingCount.textContent = "Pending: " + (tasks.length - completedTasks.length);
    completedCount.textContent = "Completed: " + completedTasks.length;
}

// Render a single task to the DOM
function renderTask(task) {
    const li = document.createElement("li");
    if (task.isDone === 1) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isDone === 1;

    const span = document.createElement("span");
    span.textContent = task.title;

    // Toggle completion (PATCH request)
    checkbox.addEventListener("change", async () => {
        await fetch(`${API_URL}/${task.id}/status`, { method: "PATCH" });
        li.classList.toggle("completed");
        updateCounts();
    });

    // Edit button (PUT request)
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", async () => {
        const newTask = prompt("Edit your task:", span.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            const updatedTitle = newTask.trim();
            await fetch(`${API_URL}/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: updatedTitle })
            });
            span.textContent = updatedTitle;
        }
    });

    // Delete button (DELETE request)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", async () => {
        await fetch(`${API_URL}/${task.id}`, { method: "DELETE" });
        taskList.removeChild(li);
        updateCounts();
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("task-buttons");
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(buttonDiv);
    taskList.appendChild(li);
}

// Add new task (POST request)
async function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskText })
    });
    
    const newTask = await response.json();
    renderTask(newTask);
    
    taskInput.value = "";
    updateCounts();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Initialize app
loadTasks();