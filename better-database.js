var itemValue = document.getElementsByName("item-value")[0];
var taskList = document.getElementsByClassName("task-list")[0];
var todoList = document.getElementsByClassName("todo-list")[0];
var all = "all"
var active = "todo";
var complete = "done";
var pageStatus = all;

function initDB() {
  var dataBase = localStorage.getItem("todoList");
  if (!dataBase) {
    var dataArr = [];
    localStorage.setItem("todoList", JSON.stringify(dataArr));
  }
}

initDB();

function addStorage() {
  var dataArr = JSON.parse(localStorage.getItem("todoList"));
  var todo = itemValue.value;
  var index = dataArr.length;
  if(todo) {
    const task = {
      id: index,
      content: todo,
      checked: false,
      unfinished: true
    };
    dataArr.push(task);
    localStorage.setItem("todoList", JSON.stringify(dataArr));
    if (pageStatus !== complete) {
      addItem(dataArr[index]);
    }
    itemValue.value = "";
  }
}

function loadItem(status) {
  var dataArr = JSON.parse(localStorage.getItem("todoList"));
  taskList.innerHTML = "";
  if(dataArr.length) {
    var localArr = [];
    var doneArr = [];
    var todoArr = [];
    filterItem(dataArr, localArr, todoArr, doneArr);
    switch(status) {
      case active:
        todoArr.forEach((item) => addItem(item));
        break;
      case complete:
        doneArr.forEach((item) => addItem(item));
        break;
      default:
        localArr.forEach((item) => addItem(item));
        break;
    }
  } 
}

function filterItem(dataArr, localArr, todoArr, doneArr) {
  for(var item in dataArr) {
    var finishState = dataArr[item].unfinished;
    var checkedState = dataArr[item].checked;
    if (finishState) {
      localArr.push(dataArr[item]);
      if (checkedState) {
        doneArr.push(dataArr[item]);
      } else {
        todoArr.push(dataArr[item]);
      }
    }
  }
}

function addItem(item) {
  var todoItem = document.createElement("li");
  var checkState = item.checked ? "checked" : "";
  todoItem.setAttribute("class", (checkState ? "done-item" : ""));
  todoItem.innerHTML = `
    <input type="checkbox" name="check-item" ${checkState} onclick="changeStyle(${item.id})" /><span>${item.content}</span>
    <input type ="button" class="delete-btn" name="delete-item" value="✕" onclick="deleteItem(${item.id})" />
  `
  taskList.appendChild(todoItem);
}

function changeStyle(index) {
  var dataArr = JSON.parse(localStorage.getItem("todoList"));
  var item = judgeIndex(dataArr, index);
  dataArr[item].checked = !dataArr[item].checked;
  localStorage.setItem("todoList", JSON.stringify(dataArr));
  loadItem(pageStatus);
}

function judgeIndex(dataArr, index) {
  var item = 0;
  while(index !== dataArr[item].id) {
      item++;
  }
  return item;
}

function deleteItem(index) {
  var dataArr = JSON.parse(localStorage.getItem("todoList"));
  var item = judgeIndex(dataArr, index);
  if (confirm("是否删除该 TODO?")) {
    dataArr[item].unfinished = false;
    localStorage.setItem("todoList", JSON.stringify(dataArr));
    loadItem(pageStatus);
  }
}

todoList.addEventListener("click", function (event) {
  var target = event.target;
  switch(target.name) {
    case ("choose-todo"):
      pageStatus = active;
      loadItem(pageStatus);
      break;
    case ("choose-done"):
      pageStatus = complete;
      loadItem(pageStatus);
      break;
    case ("choose-all"):
      pageStatus = all;
      loadItem(pageStatus);
      break;
    default:
      break;
  }
})

loadItem();
