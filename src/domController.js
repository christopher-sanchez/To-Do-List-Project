
import {ToDo,Project} from './todoApp.js';
import {format, isPast, isToday} from 'date-fns';

// project sidebar 
function renderProject(projects,activeProject, OnProjectClick){
    console.log(document.getElementById('project-list'));
    const sidebar = document.getElementById('project-list');
    sidebar.innerHTML = '';
    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        if(project.name === activeProject.name) li.classList.add('active');
        li.addEventListener('click', () => OnProjectClick(project));
        sidebar.appendChild(li);
    });
}
 
// todo for active project
function renderToDos(project){
    const container = document.getElementById('todo-list');
    container.innerHTML = '';
    project.todos.forEach(todo => {
        const card = document.createElement('div');
        card.classList.add('todo-card', todo.priority, todo.completed ? 'completed' : '');

        // due date satus
        let dateLabel = format(new Date(todo.dueDate), 'MMM d, yyyy');
        if(isToday(new Date(todo.dueDate))) dateLabel += '- Today';
        else if(isPast(new Date(todo.dueDate)) && !todo.completed) dateLabel += '- Overdue';
        card.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''} class="complete-btn">
        <div class="todo-info">
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <span class="due-date">${dateLabel}</span>
            <span class="priority">${todo.priority}</span>
        </div>
        <div class="todo-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        </div>
        `;

        // Toggle complete
        card.querySelector('.complete-btn').addEventListener('change', () => {
            todo.toggleComplete();
            renderToDos(project);
        });

        // delete todo
        card.querySelector('.delete-btn').addEventListener('click', () => {
            project.removeToDo(todo.id);
            renderToDos(project);
        });

        // edit todo
        card.querySelector('.edit-btn').addEventListener('click', () => {
            openModal(todo, project);
        });

        container.appendChild(card);
    });
}

// Modal for add/edit todo
function openModal(existingTodo = null, project){
    const modal = document.getElementById('todo-modal');
    modal.style.display = 'block';
    const form = document.getElementById('todo-form');

    // If editing, prefill the form
    if (existingTodo){
        form.title.value = existingTodo.title;
        form.description.value = existingTodo.description;
        form.dueDate.value = format(new Date(existingTodo.dueDate), 'yyyy-MM-dd');
        form.priority.value = existingTodo.priority;
    } else {
        form.reset();
    }

    modal.classList.add('open');

    form.onsubmit = (e) => {
        e.preventDefault();
         if (existingTodo){
            existingTodo.title = form.title.value;
            existingTodo.description = form.description.value;
            existingTodo.dueDate = new Date(form.dueDate.value);
            existingTodo.priority = form.priority.value;
        } else {
            // make new todo
            const newTodo = new ToDo(
                form.title.value,
                form.description.value,
                new Date(form.dueDate.value),
                form.priority.value
            );
            project.addTodo(newTodo);
        }
        closeModal();
        renderToDos(project);
    };
}

function closeModal(){
document.getElementById('todo-modal').style.display = 'none';
document.getElementById('todo-form').reset();
}

// intialize DOM
function initDOM(projects){
    let activeProject = projects[0];

    function onProjectClick(project){
        activeProject = project;
        renderProject(projects, activeProject, onProjectClick);
        renderToDos(activeProject);
    }

    renderProject(projects, activeProject, onProjectClick);
    renderToDos(activeProject);

    document.getElementById('add-todo-btn').addEventListener('click', () => {
        openModal(null, activeProject);
    });

    document.getElementById('close-modal-btn').addEventListener('click', closeModal);

   
    document.getElementById('add-project').addEventListener('click', () => {
        const name = prompt('Project name:');
        if(name){
            projects.push(new Project(name));
            activeProject = projects[projects.length - 1];
            renderProject(projects, activeProject, onProjectClick);
            renderToDos(activeProject);
        }
    });
}

export {initDOM};


