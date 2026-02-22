class ToDo{
    constructor(title, description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; //'low', 'medium', 'high'
        this.notes = '';
        this.checklist= [];
        this.completed = false;
    }
    toggleComplete(){
        this.completed = !this.completed;
    }
}

class Project{
    
}