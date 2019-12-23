var itemValue = document.getElementsByName("item-value")[0];
var todoList = document.getElementsByClassName("task-list")[0];

function addStorage() {
  if(itemValue.value) {
    var localKey = localStorage.length;
    var localValue = [itemValue.value, ""];
    localStorage.setItem(localKey, JSON.stringify(localValue));
    addItem(localKey);
    itemValue.value = "";
    itemValue.focus();
  }
}

function loadItem() {
  if(localStorage.length) {
    for(var item = 0; item < localStorage.length; item++) {
      addItem(item);
    }
  } 
}

function addItem(key) {
  var value = JSON.parse(localStorage.getItem(key));
  var todoItem = document.createElement("li");
  var checkState = value[1];
  todoItem.innerHTML = `
    <input type="checkbox" name="check-item" ${checkState} />
    <span>${value[0]}</span>
  `
  todoList.appendChild(todoItem);
}

var checkItem = document.getElementsByName("check-item");
todoList.addEventListener("click", function (event) {
  var target = event.target;
  if(target.name === "check-item") {
    var list = event.target.parentNode;
    list.setAttribute("class", (list.className === "done-item" ? "" : "done-item"));
  }
})

var checked = [];
var unChecked = [];
function judgeCheckState() {
  checked = [];
  unChecked = [];
  return checkItem.forEach((item) => item.checked ? checked.push(item.parentNode) 
                    : unChecked.push(item.parentNode));
}

function showActive() {
  judgeCheckState();
  todoList.innerHTML = "";
  unChecked.forEach((item) => todoList.appendChild(item));


}

function showDone() {
  judgeCheckState();
  todoList.innerHTML = "";
  checked.forEach((item) => todoList.appendChild(item));
}

loadItem();

