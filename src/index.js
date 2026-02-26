import {Project} from './todoApp.js';
import{initDOM} from './domController.js';

const projects = [new Project("My Todos"), new Project("Work")];
initDOM(projects);
