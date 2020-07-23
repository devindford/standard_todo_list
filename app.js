//* Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//* Event Listeners
document.addEventListener("DOMContentLoaded", retrieveTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterTodo);

//* Functions
function addTodo(event) {
  //*Stop Form Submission
  event.preventDefault();

  //* Add div with li & buttons for complete and delete
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  //* Local storage save
  saveTodos(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //* complete button

  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completeButton.classList.add("complete-button");
  todoDiv.appendChild(completeButton);

  //* Delete button

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>';
  deleteButton.classList.add("delete-button");
  todoDiv.appendChild(deleteButton);

  //* Add div to list

  todoList.appendChild(todoDiv);
  //* Clear Input

  todoInput.value = "";
}

function deleteItem(e) {
  const item = e.target;
  //* Delete Items
  if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    //* ANIMATE
    todo.classList.add("fall");
    removeStoredTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //* Check Box
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//* Filter

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//* Local Storage

function saveTodos(todo) {
  //*Check for current items
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function retrieveTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //* complete button

    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeButton.classList.add("complete-button");
    todoDiv.appendChild(completeButton);

    //* Delete button

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    //* Add div to list

    todoList.appendChild(todoDiv);
  });
}

function removeStoredTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
