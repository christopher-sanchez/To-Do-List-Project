import { format, isToday, isPast } from 'date-fns';
export class ToDo{
    constructor(title, description,dueDate,priority){
        this.id = crypto.randomUUID();
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

export class Project{
    constructor(name){
        this.name = name;
        this.todos= [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo (todoId){
        this.todos = this.todos.filter(
            t => t.id !== todoId);
        
    }
}

const defaultProject = new Project("My Todos");

const todo = {
    dueDate: new Date(2025,0,15)
};

// Format date nicely
console.log(format(todo.dueDate,'MMM dd, yyyy'));
// "Jan 15, 2025"

// Check if overdue
if (isPast(todo.dueDate)){
    console.log('Overdue!');
}

