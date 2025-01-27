
// Wrap everything inside DOMContentLoaded to ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // Avoid saving again while loading
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    // If taskText is empty, return early
    if (!taskText.trim()) {
      alert("Please enter a task!");
      return;
    }

    // Create a new list item and add a class for styling
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskItem.classList.add("task-item");

    // Create a remove button and add a class for styling
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    // Add an event listener to the remove button
    removeButton.onclick = () => {
      taskList.removeChild(taskItem); // Remove the task item from the DOM
      removeTaskFromLocalStorage(taskText); // Remove the task from Local Storage
    };

    // Append the remove button to the task item
    taskItem.appendChild(removeButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Save the task to Local Storage if not loading from storage
    if (save) {
      saveTaskToLocalStorage(taskText);
    }

    // Clear the input field after adding the task
    taskInput.value = "";
  }

  // Function to save a task to Local Storage
  function saveTaskToLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Function to remove a task from Local Storage
  function removeTaskFromLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  // Event listener for the "Add Task" button
  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });

  // Event listener for the "Enter" key in the input field
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});

