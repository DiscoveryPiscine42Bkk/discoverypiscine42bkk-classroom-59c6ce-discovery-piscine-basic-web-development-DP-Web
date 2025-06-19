const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("new-btn");

function saveTodos() {
  const todos = [];
  for (let child of ftList.children) {
    todos.push(child.textContent);
  }
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function loadTodos() {
  const match = document.cookie.match(/(^|;) *todos=([^;]*)/);
  if (match) {
    try {
      const todos = JSON.parse(decodeURIComponent(match[2]));
      todos.forEach(todoText => addTodo(todoText));
    } catch (e) {
      console.error("Invalid cookie data");
    }
  }
}

function addTodo(text) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;
  div.onclick = function () {
    if (confirm("Do you want to delete this TO DO?")) {
      ftList.removeChild(div);
      saveTodos();
    }
  };
  ftList.appendChild(div);
  saveTodos();
}

newBtn.onclick = function () {
  const todo = prompt("Enter a new TO DO:");
  if (todo && todo.trim() !== "") {
    addTodo(todo.trim());
  }
};

window.onload = loadTodos;