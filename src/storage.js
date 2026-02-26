function saveTodos(project){
    const json = JSON.stringify(projects);
    localStorage.setItem('todos',json);
}

function loadTodas(){
    const json = localStorage.getItem('todos');
    if (!json) return [];

    const projects = JSON.parse(json);
    // Re-add methods to objects!
    return projects.map(p => 
        Object.assign(new Project(),p));
}