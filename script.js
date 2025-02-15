document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `${taskText} 
        <button onclick="editTask(this)">Edit</button>
        <button onclick="toggleComplete(this)">Done</button>
        <button onclick="removeTask(this)">Delete</button>`;

    document.getElementById("taskList").appendChild(li);
    saveTasks();
    input.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function editTask(button) {
    let li = button.parentElement;
    let newText = prompt("Edit your task:", li.firstChild.textContent.trim());
    if (newText) {
        li.firstChild.textContent = newText;
        saveTasks();
    }
}

function toggleComplete(button) {
    let li = button.parentElement;
    li.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent.trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        if (task.completed) li.classList.add("completed");
        li.innerHTML = `${task.text} 
            <button onclick="editTask(this)">Edit</button>
            <button onclick="toggleComplete(this)">Done</button>
            <button onclick="removeTask(this)">Delete</button>`;
        document.getElementById("taskList").appendChild(li);
    });
}
