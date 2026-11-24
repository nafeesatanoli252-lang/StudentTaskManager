
// Signup Function
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Please enter email and password.");
        return;
    }

    if (localStorage.getItem(email)) {
        showMessage("Account already exists. Please login.");
        return;
    }

    localStorage.setItem(email, password);
    showMessage("Signup successful! Now login.");
}

// Login Function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (localStorage.getItem(email) === password && email) {
        localStorage.setItem("currentUser", email);
        showTasks();
    } else {
        showMessage("Invalid email or password.");
    }
}

function showMessage(message) {
    document.getElementById("loginMessage").textContent = message;
}

// Show Tasks
function showTasks() {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("taskSection").classList.remove("hidden");
    displayTasks();
}

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (!task) {
        alert("Please enter a task.");
        return;
    }

    let tasks = getTasks();
    tasks.push({ name: task, completed: false });

    saveTasks(tasks);
    input.value = "";
    displayTasks();
}

// Get Current User Tasks
function getTasks() {
    const user = localStorage.getItem("currentUser");
    return JSON.parse(localStorage.getItem("tasks_" + user) || "[]");
}

// Save Tasks
function saveTasks(tasks) {
    const user = localStorage.getItem("currentUser");
    localStorage.setItem("tasks_" + user, JSON.stringify(tasks));
}

// Display Tasks
function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    getTasks().forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.name;
        if (task.completed) {
            span.classList.add("completed");
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        li.append(span, completeBtn, deleteBtn);
        list.appendChild(li);
    });
}

// Mark Task Complete
function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks();
}

// Delete Task
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks();
}

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("taskSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
}

// Restore Login Session
if (localStorage.getItem("currentUser")) {
    showTasks();
}
