var itemValue = document.getElementsByName("item-value")[0];
var taskList = document.getElementsByClassName("task-list")[0];
var todoList = document.getElementsByClassName("todo-list")[0];

function loadItem(status) {
  taskList.innerHTML = "";
  if(localStorage.length) {
    var localArr = [];
    var doneArr = [];
    var todoArr = [];
    for(var item in localStorage) {
      if(localStorage.hasOwnProperty(item)) {
        var index = JSON.parse(localStorage[item])[0];
        if(JSON.parse(localStorage[item])[3]) {
          localArr[index] = JSON.parse(localStorage[item])[1];
          if(JSON.parse(localStorage[item])[2]) {
            doneArr[index] = JSON.parse(localStorage[item])[1];
          } else {
            todoArr[index] = JSON.parse(localStorage[item])[1];
          }
        }
      }
    }
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

function addStorage() {
  if (itemValue.value) {
    var localKey = itemValue.value;
    if (localStorage.getItem(localKey)) {
      alert("You have created this item!");
    } else {
      var localValue = [localStorage.length, localKey, "", true];
      localStorage.setItem(localKey, JSON.stringify(localValue));
      addItem(localKey);
      itemValue.value = "";
      itemValue.focus();
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
  if (confirm("Are you sure to delete this item?")) {
    var list = target.parentNode;
    var key = list.innerText;
    var value = JSON.parse(localStorage.getItem(key));
    var index = value[0];
    var state = value[2];
    var randomKey = new Date().getTime();
    var localValue = [index, key, state, false];
    localStorage.removeItem(key);
    localStorage.setItem(randomKey, JSON.stringify(localValue));
    loadItem();
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
      loadItem("todo");
      break;
    case ("choose-done"):
      loadItem("done");
      break;
    case ("choose-all"):
      loadItem("all");
      break;
    default:
      break;
  }
})

loadItem();
