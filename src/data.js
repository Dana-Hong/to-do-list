class Project {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

const createNewProjectInstance = () => {
    const project = new Project(null, 'Untitled', 'None');
    return project;
}

let projectStorage = [];

export { createNewProjectInstance, projectStorage };