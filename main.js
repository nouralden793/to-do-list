let inputText = document.querySelector(".inputText");
let inputAdd = document.querySelector(".inputAdd");
let tasksDiv = document.querySelector(".tasks");

let tasksArr = [];
let spaceLetters = 10;
let letters = 0;

if (localStorage.getItem("tasks")) {
  tasksArr = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocal();
checkDisaspear();

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.parentElement.remove();
    removeFromLocal(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
  if (e.target.classList.contains("right")) {
    e.target.parentElement.parentElement.classList.toggle("done");
    toggleCompleted(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
  checkDisaspear();
});

function checkSpace() {
  letters = 0;
  let inputValue = [...inputText.value];
  inputValue.map((letter) => {
    if (letter != " ") {
      letters = 1;
    }
  });
}

inputAdd.onclick = function () {
  checkSpace();
  if (letters == 1) {
    if (inputText.value != "") {
      inputText.classList.remove("border-red");
      document.querySelector(".noText").classList.add("opacity0");
      addValToArr(inputText.value);
      inputText.value = "";
    } else {
      inputText.classList.add("border-red");
      document.querySelector(".noText").classList.remove("opacity0");
    }
  } else {
    inputText.classList.add("border-red");
    document.querySelector(".noText").classList.remove("opacity0");
  }
};

function checkDisaspear() {
  if (tasksDiv.textContent == "") {
    let p = document.createElement("p");
    p.textContent = "There Is No Tasks";
    tasksDiv.appendChild(p);
  }
}

function addValToArr(val) {
  let task = {
    value: val,
    id: Date.now(),
    completed: false,
  };
  tasksArr.push(task);
  addEleToPage(tasksArr);
  addDateToLocal(tasksArr);
}

function addEleToPage(tasksArr) {
  tasksDiv.textContent = "";
  tasksArr.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    let taskValue = document.createElement("p");
    taskValue.textContent = task.value;
    div.appendChild(taskValue);
    let operaDiv = document.createElement("div");
    let p = document.createElement("p");
    p.onclick = function () {
      if (p.textContent == "Done") {
        p.textContent = "UnDone";
      } else {
        p.textContent = "Done";
      }
    };
    p.className = "right";
    p.textContent = "Done";
    if (task.completed == true) {
      div.className = "task done";
      p.textContent = "UnDone";
    }
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    operaDiv.appendChild(p);
    operaDiv.appendChild(span);
    div.appendChild(operaDiv);
    tasksDiv.appendChild(div);
  });
}

function addDateToLocal(tasksArr) {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function getDataFromLocal() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let jsData = JSON.parse(data);
    addEleToPage(jsData);
  }
}

function removeFromLocal(id) {
  tasksArr = tasksArr.filter((task) => task.id != id);
  addDateToLocal(tasksArr);
}

function toggleCompleted(id) {
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i].id == id) {
      tasksArr[i].completed == false
        ? (tasksArr[i].completed = true)
        : (tasksArr[i].completed = false);
    }
  }
  addDateToLocal(tasksArr);
}
