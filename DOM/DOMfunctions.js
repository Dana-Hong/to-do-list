import { createNewProjectInstance, projectStorage } from "../src/data.js";
import { createProjectDOM } from "./DOMelements.js";

function create(elementName, ...elementClasses) {
    const element = document.createElement(elementName);
    for (let cssClass of elementClasses) {
        element.classList.add(cssClass);
    }
    return element;
}

function createNewProject() {
    const project = createNewProjectInstance();
    project.DOM = createProjectDOM();
    project.id = projectStorage.length;
    project.DOM.title.id = project.id;
    project.DOM.sideMenuItem.id = project.id;
    displayNewProject(project);
    updateProjectList(project);
    // event.stopPropagation();
}

function select(querySelector) {
    return document.querySelector(querySelector);
}

const increaseSize = (event) => {
    if (event.target === select('.project-title')) {
        event.target.style.height = "6rem";
    }
    event.target.style.height = event.target.scrollHeight + "px";
}

const toggleStyle = (event) => {
    if ((event instanceof KeyboardEvent && event.key === 'Enter') || event instanceof PointerEvent) {
        const checkbox = event.target;
        const note = event.target.parentElement.lastElementChild;
        if (note.value) {
            checkbox.classList.toggle('checked');
            note.classList.toggle('task-complete');
        }
    }
}

const displayNewProject = (project) => {
    const container = select('.project-container');
    container.textContent = '';
    container.append(project.DOM.project);
}

const updateProjectList = (project) => {
    const projectList = select('.project-list');
    projectList.append(project.DOM.sideMenuItem);
    projectStorage.push(project);
}

function updateDOM(event) {
    if (event instanceof PointerEvent) {
        projectStorage.map(project => {
            if (Number(event.target.id) === project.id) {
                displayNewProject(project);
            }
        });
    } else if (event.target.parentElement === select('.project-list')) {
        projectStorage.map(project => {
            if (Number(event.target.id) === project.id) {
                project.DOM.title.value = event.target.value;
            }
        });
    } else {
        projectStorage.map(project => {
            if (Number(event.target.id) === project.id) {
                project.DOM.sideMenuItem.value = event.target.value;
            }
        })
    }
}

export { 
    create,
    createNewProject,
    select,
    increaseSize,
    toggleStyle,
    displayNewProject,
    updateProjectList,
    updateDOM
};