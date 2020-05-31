class TodoItem {
    constructor(task) {
        this.id = Date.now();
        this.content = task;
        this.completed = false;
    }
}


module.exports =  {
        TodoItem, 
}