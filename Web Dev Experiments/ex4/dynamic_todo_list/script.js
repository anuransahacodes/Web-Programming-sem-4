// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// Update task counters
function updateCounts() {
    const tasks = document.querySelectorAll("#taskList li");
    const completedTasks = document.querySelectorAll("#taskList li.completed");

    pendingCount.textContent = "Pending: " + (tasks.length - completedTasks.length);
    completedCount.textContent = "Completed: " + completedTasks.length;
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    // Create list item
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Toggle completion
    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed");
        updateCounts();
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
        const newTask = prompt("Edit your task:", span.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            span.textContent = newTask.trim();
        }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        updateCounts();
    });

    // Button container
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("task-buttons");
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(buttonDiv);

    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    updateCounts();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);

// Allow Enter key to add task
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});