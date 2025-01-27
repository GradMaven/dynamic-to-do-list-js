// Wrap everything inside DOMContentLoaded to ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to add a new task
  function addTask() {
    // Retrieve and trim the input value
    const taskText = taskInput.value.trim();

    // Check if the task input is empty
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create a new list item and add a class for styling
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskItem.classList.add("task-item"); // Add a CSS class to the list item

    // Create a remove button and add a class for styling
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn"); // Add a CSS class to the button

    // Add an event listener to the remove button
    removeButton.onclick = () => {
      taskList.removeChild(taskItem); // Remove the task item from the list
    };

    // Append the remove button to the task item
    taskItem.appendChild(removeButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Clear the input field after adding the task
    taskInput.value = "";
  }

  // Event listener for the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Event listener for the "Enter" key in the input field
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
