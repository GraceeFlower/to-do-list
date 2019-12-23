var itemValue = document.getElementsByName("item-value")[0];
var todoList = document.getElementsByClassName("task-list")[0];
var localCount = 0;

function addStorage() {
  var localKey = localCount++;
  var localValue = itemValue.value;
  localStorage.setItem(localKey, localValue);
  addItem(localValue);
  itemValue.value = "";
  itemValue.focus();
}

function loadItem() {
  for(var item = 0; item < localStorage.length; item++) {
    var values = localStorage.getItem(item);
    addItem(values);
  }
}

function addItem(value) {
  var todoItem = document.createElement("li");
  todoItem.innerHTML = `
    <input type="checkbox" name="check-item" />
    <span>${value}</span>
  `
  todoList.appendChild(todoItem);
}

loadItem();

