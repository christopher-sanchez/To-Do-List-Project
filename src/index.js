import {Project} from './todoApp.js';
import{initDOM} from './domController.js';

document.addEventListener('DOMContentLoaded', () => {
const projects = [new Project("My Todos"), new Project("Work")];
initDOM(projects);
});