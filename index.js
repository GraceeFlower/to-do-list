var itemValue = document.getElementsByName("item-value")[0];
var taskList = document.getElementsByClassName("task-list")[0];
var todoList = document.getElementsByClassName("todo-list")[0];
var pageStatus = 'all';

function loadItem(status) {
  taskList.innerHTML = "";
  if(localStorage.length) {
    var localArr = [];
    var doneArr = [];
    var todoArr = [];
    filterItem(localArr, todoArr, doneArr);
    switch(status) {
      case "todo":
        todoArr.forEach((key) => addItem(key));
        break;
      case "done":
        doneArr.forEach((key) => addItem(key));
        break;
      default:
        localArr.forEach((key) => addItem(key));
        break;
    }
  } 
}

function filterItem(localArr, todoArr, doneArr) {
  for(var item in localStorage) {
    if(localStorage.hasOwnProperty(item)) {
      var values = JSON.parse(localStorage[item]);
      var index = values[0];
      if(values[3]) {
        localArr[index] = values[1];
        if(values[2]) {
          doneArr[index] = values[1];
        } else {
          todoArr[index] = values[1];
        }
      }
    }
  }
}

function addStorage() {
  if (itemValue.value) {
    var localKey = itemValue.value;
    if (localStorage.getItem(localKey)) {
      alert("您已创建该任务！");
      itemValue.focus();
    } else {
      var localValue = [localStorage.length, localKey, "", true];
      localStorage.setItem(localKey, JSON.stringify(localValue));
      if (pageStatus !== "done") {
        addItem(localKey);
      }
      itemValue.value = "";
    }
  }
}

function addItem(key) {
    var value = JSON.parse(localStorage.getItem(key));
    var todoItem = document.createElement("li");
    var checkState = value[2];
    todoItem.setAttribute("class", (checkState ? "done-item" : ""));
    todoItem.innerHTML = `
      <input type="checkbox" name="check-item" ${checkState} /><span>${value[1]}</span>
      <input type ="button" class="delete-btn" name="delete-item" value="✕"/>
    `
    taskList.appendChild(todoItem);
}

function changeState(list) {
  var key = list.innerText;
  var state = list.className ? "checked" : "";
  var index = JSON.parse(localStorage.getItem(key))[0];
  var localValue = [index, list.innerText, state, true];
  localStorage.setItem(key, JSON.stringify(localValue));
}

function changeStyle(target) {
  var list = target.parentNode;
  list.setAttribute("class", (list.className ? "" : "done-item"));
  changeState(list);
}

function deleteItem(target) {
  if (confirm("是否删除该 TODO?")) {
    var list = target.parentNode;
    var key = list.innerText;
    var value = JSON.parse(localStorage.getItem(key));
    var index = value[0];
    var state = value[2];
    var randomKey = new Date().getTime();
    var localValue = [index, key, state, false];
    localStorage.removeItem(key);
    localStorage.setItem(randomKey, JSON.stringify(localValue));
    loadItem(pageStatus);
  }
}

todoList.addEventListener("click", function (event) {
  var target = event.target;
  switch(target.name) {
    case ("check-item"):
      changeStyle(target);
      break;
    case ("delete-item"):
      deleteItem(target);
      break;
    case ("choose-todo"):
      pageStatus = "todo";
      loadItem(pageStatus);
      break;
    case ("choose-done"):
      pageStatus = "done";
      loadItem(pageStatus);
      break;
    case ("choose-all"):
      pageStatus = "all"
      loadItem(pageStatus);
      break;
    default:
      break;
  }
})

loadItem();
