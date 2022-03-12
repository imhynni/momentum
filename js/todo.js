const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = []; //update가 가능하도록 let으로 바꿔줌

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //toDos 배열 모양이 유지된 string으로 저장됨
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); //toDo의 id는 number, li의 id는 string(DOM의 id는 string으로 들어감)
    saveToDos(); //변경된 toDos를 다시 저장해야 함!!
}

function paintToDo(newToDoObj){
    const li = document.createElement("li");
    li.id = newToDoObj.id; //list item을 구분하기 위해서 li에 id 부여
    const span = document.createElement("span");
    span.innerText = newToDoObj.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    toDoList.appendChild(li);
}

function handleTodoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text:newTodo,
        id:Date.now(), //밀리초(ms)
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleTodoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){ //localStorage에 todos가 있으면
    const parsedToDos = JSON.parse(savedToDos); //localstorage에는 string만 저장되기 때문에 가져온 string을 배열 object로 parse 해줘야 함
    toDos = parsedToDos; //이전 ToDo 복원(안 그러면 새로고침하고 newToDo 입력할 때마다 localStorage에 저장되는 ToDos값이 []에서 추가됨)
    parsedToDos.forEach(paintToDo); //array에 있는 각각의 item에 대해 function 수행
}