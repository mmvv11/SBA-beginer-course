window.onload = function () {
  rederingTodoList(todoData);

  // 이벤트 처리
  var createTodoButton = document.getElementsByClassName("create-todo")[0];
  createTodoButton.addEventListener("click", function () {
    var todoText = inputTodo.value;
    if (todoText) {
      createTodo(todoText);
    }
  });

  var inputTodo = document.getElementById("input-todo");
  inputTodo.addEventListener("keydown", function (event) {
    var todoText = event.target.value;

    if (event.key == "Enter" && todoText) {
      createTodo(todoText);
    }
  });

  // todo 이벤트 위임 구간 RUD 이벤트 분기처리할것
  var todoListUl = document.getElementById("todo-list");
  todoListUl.addEventListener("click", function (event) {
    var target = event.target;
    var targetClass = target.getAttribute("class");

    if (targetClass.includes("check-done")) {
      checkItsDone(target);
    } else if (targetClass.includes("update-todo")) {
      updateTodo(target);
    } else if (targetClass.includes("delete-todo")) {
      deleteTodo(target);
    }
  });
};

// 로컬스토리지에서 데이터 가져오기
var todoData = localStorage.getItem("todoList");

if (!todoData) {
  localStorage.setItem("todoList", JSON.stringify([]));
  todoData = JSON.parse(localStorage.getItem("todoList"));
} else {
  todoData = JSON.parse(localStorage.getItem("todoList"));
}

// todo rendering
function rederingTodoList(todoData) {
  todoData.forEach((todo) => {
    addTodoToDOM(todo);
  });
}

// 로컬스토리지 업데이트하기
function updateLocalStrageTodoData(todoData) {
  var updatedTodoData = JSON.stringify(todoData);
  localStorage.setItem("todoList", updatedTodoData);
}

// create
function createTodo(todoText) {
  var todoId = Date.now();
  var todoObject = {
    todoId: todoId,
    todoText: todoText,
    checkDone: false,
  };

  // localStorage 업데이트
  todoData.push(todoObject);
  updateLocalStrageTodoData(todoData);

  // DOM에 추가하는 함수 호출
  addTodoToDOM(todoObject);
  document.getElementById("input-todo").value = "";
}

// done 표시하기
function checkItsDone(target) {
  // dom 수정
  checkFromDom(target);
  // localstorage 수정
  checkFromLocalStorage(target);
}

function checkFromDom(target) {
  if (target.checked) {
    target.nextSibling.classList.add("done");
  } else {
    target.nextSibling.classList.remove("done");
  }
}

function checkFromLocalStorage(target) {
  var todoId = target.closest("li.todo-item").getAttribute("id");
  var todoData = localStorage.getItem("todoList");

  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
    todoData = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoData = JSON.parse(localStorage.getItem("todoList"));
  }

  todoData.forEach((todo) => {
    if (todo.todoId == todoId) {
      todo.checkDone = target.checked;
      updateLocalStrageTodoData(todoData);
    }
  });
}

// update
function updateTodo(target) {
  var updatedTodoText = prompt("수정 내용");

  // dom 수정하기
  updateFromDom(target, updatedTodoText);

  // localStorage 수정하기
  updateFromLocalStorage(target, updatedTodoText);
}

function updateFromDom(target, updatedTodoText) {
  var todoTextP = target.closest("li.todo-item").firstChild.lastChild;
  todoTextP.innerText = updatedTodoText;
}

function updateFromLocalStorage(target, updatedTodoText) {
  var todoId = target.closest("li.todo-item").getAttribute("id");
  var todoData = localStorage.getItem("todoList");

  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
    todoData = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoData = JSON.parse(localStorage.getItem("todoList"));
  }

  todoData.forEach((todo) => {
    if (todo.todoId == todoId) {
      todo.todoText = updatedTodoText;
      updateLocalStrageTodoData(todoData);
    }
  });
}

// delete
function deleteTodo(target) {
  var todoId = target.closest("li.todo-item").getAttribute("id");

  // dom에서 지우기
  deleteFromDom(todoId);

  // localStorage에서 지우기
  deleteFromLocalStorage(todoId);
}

function deleteFromDom(todoId) {
  document.getElementById(todoId).remove();
}

function deleteFromLocalStorage(todoId) {
  var todoData = localStorage.getItem("todoList");

  if (!todoData) {
    localStorage.setItem("todoList", JSON.stringify([]));
    todoData = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoData = JSON.parse(localStorage.getItem("todoList"));
  }

  todoData.forEach((todo) => {
    if (todo.todoId == todoId) {
      var index = todoData.indexOf(todo);
      todoData.splice(index, 1);
      updateLocalStrageTodoData(todoData);
    }
  });
}

// read
function addTodoToDOM(todoObject) {
  //   <li class="todo-item" id="??">
  //   <span class="done-text">
  //     <input type="checkbox" class="check-done" />
  //     <p class="todo-text">ㄱㄱ</p>
  //   </span>

  //   <span class="update-delete">
  //     <i class="update-todo fas fa-edit"></i>
  //     <i class="delete-todo fas fa-trash-alt"></i>
  //   </span>
  // </li>

  // 최상위 li 태그
  var li = document.createElement("li");
  li.setAttribute("id", todoObject.todoId);
  li.setAttribute("class", "todo-item");

  // 체크박스, 텍스트 표시 컨테이너 span
  var doneTextSpan = document.createElement("span");
  doneTextSpan.setAttribute("class", "done-text");

  var checkDoneInput = document.createElement("input");
  checkDoneInput.setAttribute("type", "checkbox");
  checkDoneInput.setAttribute("class", "check-done");

  var todoTextP = document.createElement("p");
  todoTextP.setAttribute("class", "todo-text");
  var todoText = document.createTextNode(todoObject.todoText);
  todoTextP.appendChild(todoText);

  doneTextSpan.appendChild(checkDoneInput);
  doneTextSpan.appendChild(todoTextP);

  // 수정, 삭제 아이콘 컨테이너 span
  var updateDeleteSpan = document.createElement("span");
  updateDeleteSpan.setAttribute("class", "update-delete");

  var updateIcon = document.createElement("i");
  updateIcon.setAttribute("class", "fas");
  updateIcon.classList.add("fa-edit");
  updateIcon.classList.add("update-todo");

  var deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas");
  deleteIcon.classList.add("fa-trash-alt");
  deleteIcon.classList.add("delete-todo");

  updateDeleteSpan.appendChild(updateIcon);
  updateDeleteSpan.appendChild(deleteIcon);

  // li에 자식 노드로 추가
  li.appendChild(doneTextSpan);
  li.appendChild(updateDeleteSpan);

  // checkDone에 따른 처리
  if (todoObject.checkDone) {
    checkDoneInput.checked = true;
    todoTextP.classList.add("done");
  }

  document.getElementById("todo-list").appendChild(li);
}
