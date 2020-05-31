class TodoItem {
    constructor(task) {
        this.id = Date.now();
        this.content = task;
        this.completed = false;
    }
}

function addTodo() {
    // Get the entry
    var todoEntry = document.getElementById("todoEntry").value;
    
    if (todoEntry !== '') {
        saveEntry(todoEntry);
    } else {
        showError();
    }
    document.getElementById("todoEntry").value = '';
}

function displayEntry(todo) {


    var todoItemDiv = document.createElement('div');
    todoItemDiv.setAttribute('class', 'todoItem');
    todoItemDiv.setAttribute('id', todo.id)

    var spanIconComplete = document.createElement("span");
    spanIconComplete.setAttribute('class', 'material-icons');
    spanIconComplete.innerText = "check_box_outline_blank";
    spanIconComplete.setAttribute("id", "iconFor"+todo.id)
    spanIconComplete.myParam = todo.id;
    
    var taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'task');
    taskDiv.innerText = todo.content;

    var endBtn = document.createElement('span');
    endBtn.setAttribute('class', 'material-icons');
    endBtn.innerText = "delete_forever";
    endBtn.addEventListener('click', deleteTask, false);
    endBtn.myParam = todo.id;
    
    if (todo.completed){
        todoItemDiv.classList.add("completed");
        spanIconComplete.innerText = "check_box";
    } else {
        spanIconComplete.addEventListener('click', completeTask, false);
    }
    
    todoItemDiv.appendChild(spanIconComplete);
    todoItemDiv.appendChild(taskDiv);
    todoItemDiv.appendChild(endBtn);

    document.getElementsByClassName('todoList')[0].appendChild(todoItemDiv);

}

async function completeTask(evt) {

    document.getElementById(evt.currentTarget.myParam).classList.add("completed");
    document.getElementById("iconFor"+evt.currentTarget.myParam).innerText = "check_box";
    var entries = await getEntries();
    
    var stutus = entries.findIndex(entry => entry.id === evt.currentTarget.myParam);
    entries[stutus].completed = true

  
    localStorage.setItem('testC', JSON.stringify(entries));
}

async function deleteTask(evt) {
    document.getElementById(evt.currentTarget.myParam).remove();

    var entries = await getEntries();
    
    var deleteable = entries.find(entry => entry.id === evt.currentTarget.myParam);


    var updatedTasks = entries.filter(entry => entry !== deleteable);

    localStorage.setItem('testC', JSON.stringify(updatedTasks));
}

async function saveEntry(entry) {

    var entries = await getEntries();

    var todoEntry = new TodoItem(entry);

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
    document.getElementsByClassName('todoList')[0].innerHTML = '';

    var todos = await getEntries();
    
    displayCount(todos.filter(item => item.completed === false).length);

    if (todos !== null) {
        todos.forEach(todo => {
            displayEntry(todo);
        });
    } else {
        // ADD A message to add a todo!
    }

}

function displayCount(count) {
    // Reset the html to be empty, may not need this
    var taskCount = document.getElementsByClassName('count')[0];
    taskCount.innerHTML = '';

    if (count === 1) {
        taskCount.innerText = count + " Task Left!"
    } else {
        taskCount.innerText = count + " Tasks Left"

    }
    
}

function showError() {
    document.getElementById('err').innerText = "You need to enter some text!"
    setTimeout(function(){ document.getElementById('err').innerText = '' }, 3000);
}


// Footer filters 
async function activeTodos() {
    document.getElementsByClassName('todoList')[0].innerHTML = '';
    var todos = await getEntries();
    displayCount(todos.filter(item => item.completed === false).length);

    if (todos !== null) {
        todos.filter(todo => todo.completed === false)
        .forEach(todo => {
            displayEntry(todo);
        });
    }
}

async function completedTodos() {
    document.getElementsByClassName('todoList')[0].innerHTML = '';
    var todos = await getEntries();
    
    displayCount(0);

    if (todos !== null) {
        todos.filter(todo => todo.completed === true)
        .forEach(todo => {
            displayEntry(todo);
        });
    }
}


startUp();