let post = document.getElementById("ButtonPost");
let clear = document.getElementById("ButtonClear");
let mark = document.getElementById("ButtonMark");
let del = document.getElementById("ButtonDelete");

TodoPost = (event) => {
    event.preventDefault();
    var todo = document.getElementById("todoText").value;
    var list = document.getElementById("todoList");

    let currentListHTML = list.innerHTML;
    list.innerHTML = 
        currentListHTML + '<input type = "checkbox" name="todo" /> ' + todo + '<br>';
        document.getElementById("todoText").value = "";
}

TodoClear = (event) => {
    event.preventDefault();
    var todos = document.getElementsByName("todo");
    for(var i = 0; i < todos.length; i++){
        todos[i].checked = false;
    }
}

TodoMark = (event) => {
    event.preventDefault();
    var todos = document.getElementsByName("todo");
    for(var i = 0; i < todos.length; i++){
        todos[i].checked = true;
    }
}

TodoDel  = (event) => {
    event.preventDefault();
    var list = document.getElementById("todoList");
    list.innerHTML = "";
}

post.addEventListener("click", TodoPost);
clear.addEventListener("click", TodoClear);
mark.addEventListener("click", TodoMark);
del.addEventListener("click", TodoDel);