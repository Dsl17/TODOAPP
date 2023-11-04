let tasks = [];
const taskContainer = document.querySelector("#taskContainer");

//ADD TASKS
function addTask() {
  const taskForm = document.querySelector("form");
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskname = taskForm.querySelector("#task");
    const dueDate = taskForm.querySelector("#duedate");
    const label = taskForm.querySelector("#label");
    tasks.push({
      taskname: taskname.value,
      dueDate: dueDate.value,
      label: label.value,
    });
    displayTasks(tasks);

    taskname.value = "";
    dueDate.value = "";
    label.value = "";
  });
}

//DISPLAY TASKS
function displayTasks(tasksArray) {
  taskContainer.innerHTML = "";

  for (let tasklist of tasksArray) {
    const newTask = document.createElement("div");
    newTask.classList.add("tasklist");
    const taskname = document.createElement("input");
    taskname.type = "text";
    taskname.readOnly = true;
    taskname.value = tasklist.taskname;

    const dueDate = document.createElement("p");
    dueDate.textContent = tasklist.dueDate ? tasklist.dueDate : "Not Set";
    dueDate.classList.add("dueDate");

    const label = document.createElement("p");
    label.textContent = tasklist.label;
    label.classList.add("label");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    const completedCheck = document.createElement("input");
    completedCheck.type = "checkbox";
    completedCheck.classList.add("checkbox");

    newTask.appendChild(completedCheck);
    newTask.appendChild(taskname);
    newTask.appendChild(dueDate);
    newTask.appendChild(label);
    newTask.appendChild(deleteButton);

    taskContainer.appendChild(newTask);

    completedCheck.addEventListener("change", () => {
      if (completedCheck.checked) {
        newTask.classList.toggle("completed");
      } else {
        newTask.classList.toggle("completed");
      }
    });
    deleteButton.addEventListener("click", () => {
      deleteTasks(deleteButton);
      tasks.splice(tasks.indexOf(tasklist, 1));
    });
  }
}

//DELETE TASKS
function deleteTasks(deleteButton) {
  taskContainer.removeChild(deleteButton.parentElement);
}

//FILTER TASKS BY LABEL
function filterTasksbyLabel() {
  const filterInput = document.querySelector("#filter");
  filterInput.addEventListener("input", () => {
    const filterCondition = filterInput.value;
    Array.from(taskContainer.children).forEach((tasklist) => {
      if (
        !tasklist
          .querySelector(".label")
          .textContent.toLowerCase()
          .includes(filterCondition.toLowerCase())
      ) {
        tasklist.style.display = "none";
      } else {
        tasklist.style.display = "grid";
      }
    });
  });
}

function filterByCompletion() {
  const compfilter = document.querySelector("#completion");
  compfilter.addEventListener("change", function () {
    const tasklist = document.querySelectorAll(".tasklist");
    switch (compfilter.value) {
      case "completed":
        tasklist.forEach((task) => {
          task.className.includes("completed")
            ? (task.style.display = "grid")
            : (task.style.display = "none");
        });
        break;
      case "Notcompleted":
        tasklist.forEach((task) => {
          !task.className.includes("completed")
            ? (task.style.display = "grid")
            : (task.style.display = "none");
        });
        break;
      default:
        tasklist.forEach((task) => {
          task.style.display = "grid";
        });
    }
  });
}

addTask();
filterTasksbyLabel();
filterByCompletion();
