var oldEntries = getEntries();

function addTodo() {
    // Get the entry
    var todoEntry = document.getElementById("todoEntry").value;

    if (todoEntry !== '') {
        saveEntry(todoEntry);
    } else {
        showError();
    }

    document.getElementById("todoEntry").value = '';

    // Add to local storage
}

function displayEntry(todo, status) {


    var todoItemDiv = document.createElement('div');
    todoItemDiv.setAttribute('class', 'todoItem');
    todoItemDiv.setAttribute('id', todo.id)

    var squareDiv = document.createElement("span");
    squareDiv.setAttribute('class', 'material-icons');
    squareDiv.innerText = "done";
    todoItemDiv.appendChild(squareDiv);
    squareDiv.myParam = todo.id;

    var taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'task');
    taskDiv.innerText = todo.content;
    todoItemDiv.appendChild(taskDiv);

    if (todo.completed){
        squareDiv.classList.add("completed");
        taskDiv.classList.add('completed');
    } else {
        squareDiv.addEventListener('click', completeTask, false);
    }

    var endBtn = document.createElement('span');
    endBtn.setAttribute('class', 'material-icons');
    endBtn.innerText = "delete_forever";
    endBtn.addEventListener('click', deleteTask, false);
    endBtn.myParam = todo.id;
    todoItemDiv.appendChild(endBtn);

    document.getElementsByClassName('todoList')[0].appendChild(todoItemDiv);

}

async function completeTask(evt) {

    document.getElementById(evt.currentTarget.myParam).classList.add("completed");
    var entries = await oldEntries;
    
    var stutus = entries.findIndex(entry => entry.id === evt.currentTarget.myParam);
    entries[stutus].completed = true

  
    localStorage.setItem('testC', JSON.stringify(entries));
}

async function deleteTask(evt) {
    document.getElementById(evt.currentTarget.myParam).remove();

    var entries = await oldEntries;
    
    var deleteable = entries.find(entry => entry.id === evt.currentTarget.myParam);


    var updatedTasks = entries.filter(entry => entry !== deleteable);

    localStorage.setItem('testC', JSON.stringify(updatedTasks));

    oldEntries = await getEntries();
}

async function saveEntry(entry) {

    var entries = await oldEntries;

    var todoEntry = {
        id: Date.now(),
        content: entry,
        completed: false
    }

    displayEntry(todoEntry, "all");
    entries.push(todoEntry);
    console.log(entries);

    localStorage.setItem('testC', JSON.stringify(entries));
}

async function getEntries() {
    var entries = await JSON.parse(localStorage.getItem('testC'));
    if (entries !== null) {
        return entries;
    } else {
        entries = [];
        return entries;
    }
}

async function startUp() {
    var todos = await getEntries();

    if (todos !== null) {
        todos.forEach(todo => {
            console.log(todo);
            displayEntry(todo);
        });
    }

}

function showError() {
    document.getElementById('err').innerText = "You need to enter some text!"
    setTimeout(function(){ document.getElementById('err').innerText = '' }, 3000);
}

startUp();