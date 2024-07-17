const input_tesk = document.getElementById("input-task");
const input_date = document.getElementById("input-date");
const but_add = document.getElementById("but-add");
const but_edit = document.getElementById("but-edit");
const tag_alert = document.getElementById("alert");
const tbody = document.getElementById("tbody");
const but_deleteall = document.getElementById("but-deleteall");
const but_filter = document.querySelectorAll(".button-filter");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const displayTodos = (data) => {
  let todosList = data || todos;
  if (!todosList.length) {
    tbody.innerHTML = `<tr><td colspan="4";>Not found tesk !</td></tr>`;
    return;
  }
  tbody.innerHTML = "";
  todosList.forEach((todo) => {
    tbody.innerHTML += `
    <tr>
    <td>${todo.task}</td>
    <td>${todo.date || "no date"}</td>
    <td>${todo.Condition ? "do" : "undo"}</td>
    <td><button onclick="editHandeler(${
      todo.id
    });">edit</button><button onclick="ConditionHandeler(${todo.id});">${
      todo.Condition ? "undo" : "do"
    }</button><button onclick="deleteTask(${todo.id});">delete</button></td>
    </tr>
    `;
  });
};
const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const showalert = (text, type) => {
  tag_alert.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerHTML = text;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  tag_alert.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};
const generatedid = () => {
  const id = todos.length + 1 * 1000;
  return id;
};
const addhandeler = () => {
  const task = input_tesk.value;
  const date = input_date.value;
  const todo = {
    id: generatedid(),
    task,
    date,
    Condition: false,
  };
  if (task != "") {
    todos.push(todo);
    input_tesk.value = "";
    input_date.value = "";
    showalert("success ;)", "success");
    save();
    displayTodos();
  } else {
    showalert("enter you tesk !!", "error");
  }
};
const deleteALL = () => {
  if (!todos.length) {
    showalert("are you ill !!!", "error");
  } else {
    todos = [];
    save();
    displayTodos();
    showalert("All items were successfully deleted ;)", "success");
  }
};
const deleteTask = (id) => {
  const newtodos = todos.filter((todo) => todo.id != id);
  todos = newtodos;
  save();
  displayTodos();
  showalert("items were successfully deleted ;)", "success");
};
const ConditionHandeler = (id) => {
  const todo = todos.find((todo) => todo.id == id);
  todo.Condition = !todo.Condition;
  save();
  displayTodos();
};
const editHandeler = (id) => {
  const todo = todos.find((todo) => todo.id == id);
  input_tesk.value = todo.task;
  input_date.value = todo.date;
  but_add.style.display = "none";
  but_edit.style.display = "inline-block";
  but_edit.dataset.id = id;
};
const editaplay = (event) => {
  const todo = todos.find((todo) => todo.id == event.target.dataset.id);
  todo.task = input_tesk.value;
  todo.date = input_date.value;
  input_tesk.value = "";
  input_date.value = "";
  but_add.style.display = "inline-block";
  but_edit.style.display = "none";
  save();
  displayTodos();
  showalert("item were successfuly edited ;)", "success");
};
const filterhandeler = (event) => {
  let filters;
  const filter = event.target.innerText;
  switch (filter) {
    case "done":
      filters = todos.filter((todo) => todo.Condition == true);
      break;
    case "undo":
      filters = todos.filter((todo) => todo.Condition == false);
      break;
    default:
      filters = todos;
      break;
  }
  displayTodos(filters);
};
but_filter.forEach((but) => {
  but.addEventListener("click", filterhandeler);
});
window.addEventListener("load", displayTodos());
but_add.addEventListener("click", addhandeler);
but_deleteall.addEventListener("click", deleteALL);
but_edit.addEventListener("click", editaplay);
