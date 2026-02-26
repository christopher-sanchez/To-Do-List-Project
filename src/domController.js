import {ToDO,Project} from './todoApp.js';
import {format, isPast, isToday} from 'date-fns';

// project sidebar 
function renderProject(projects,activeProject, OnProjectClick){
    const sidebar = document.querySelector('project-list');
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
            project.removeToDo(todo);
            renderToDos(project);
        });

        // edit todo
        card.querySelector('.edit-btn').addEventListener('click', () => {
            openModel(todo, project);
        });

        container.appendChild(card);
    });
}
