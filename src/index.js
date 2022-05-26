import { create, select } from "../DOMfunctions.js";
import Project from "./data.js";

let storage = [];

const createTitle = () => {
    const title = create('textarea', 'project-title');
    title.placeholder = 'Untitled Project';
    title.addEventListener('keydown', increaseSize);
    title.addEventListener('keyup', updateDOM);
    return title;
}

const createNoteContainer = () => {
    const noteContainer = create('div', 'note-container');
    const note = createNewNote();
    const noteList = create('ul', 'note-list');
    note.lastElementChild.placeholder = "What do you need to do today?";
    noteList.append(note);
    noteContainer.addEventListener('click', (event) => {
        if (event.target === select('.note-container')) {
            if (noteList.lastElementChild.lastElementChild.value) {
                noteList.append(createNewNote());
            } else {
                return;
            }
        }
    });
    noteContainer.append(noteList);
    return noteContainer;

}

const createDescription = () => {
    const description = create('textarea', 'project-description');
    description.placeholder = 'Description';
    description.addEventListener('keydown', increaseSize);
    description.maxLength = 210;
    return description;

}

const createProjectDiv = () => {
    const project = create('div', 'project');
    const title = createTitle();
    const noteContainer = createNoteContainer();
    const description = createDescription();
    project.append(title, description, noteContainer);
    return { project, title, description, noteContainer };
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

const createNewNote = () => {
    const textBox = create('li', 'note');
    const checkbox = create('input', 'checkbox');
    checkbox.addEventListener('click', toggleStyle);
    checkbox.addEventListener('keydown', toggleStyle);
    const text = create('input', 'new-note-input');
    text.addEventListener('keyup', (event) => {
        const noteList = select('.note-list')
        if ((event.target.parentElement === event.target.parentElement.parentElement.lastElementChild) && event.key === 'Enter' && event.target.value) {
            noteList.append(createNewNote(event));
            noteList.lastElementChild.lastElementChild.focus();
        } else if ((event.key === 'Backspace') && !event.target.value) {
            if (noteList.children.length > 1) {
                noteList.lastElementChild.remove();
                noteList.lastElementChild.lastElementChild.focus();
            } else {
                noteList.lastElementChild.lastElementChild.focus();
            }
        }
    });
    checkbox.type = 'checkbox';
    textBox.append(checkbox, text);
    return textBox;
}

const createProjectListItem = () => {
    const projectListItem = create('input', 'side-menu-item-project');
    projectListItem.placeholder = 'Untitled Project';
    projectListItem.addEventListener('click', updateDOM);
    projectListItem.addEventListener('keyup', updateDOM);
    projectListItem.maxLength = 20;
    return projectListItem;
}

const createProjectDOM = () => {
    const projectDOM = createProjectDiv();
    projectDOM.sideMenuItem = createProjectListItem();
    return projectDOM;
}

// Create class instance and add to storage;

const createNewProjectInstance = () => {
    const project = new Project(null, 'Untitled', 'None');
    return project;

}

const displayNewProject = (project) => {
    const container = select('.project-container');
    container.textContent = '';
    container.append(project.DOM.project);
}

const updateProjectList = (project) => {
    const projectList = select('.project-list');
    projectList.append(project.DOM.sideMenuItem);
    storage.push(project);
}

function createNewProject(event) {
    const project = createNewProjectInstance();
    project.DOM = createProjectDOM();
    project.id = storage.length;
    project.DOM.title.id = project.id;
    project.DOM.sideMenuItem.id = project.id;
    displayNewProject(project);
    updateProjectList(project);
    console.log(project);
    event.stopPropagation();
}

function updateDOM(event) {
    if (event instanceof PointerEvent) {
        storage.map(project => {
            if (Number(event.target.id) === project.id) {
                displayNewProject(project);
            }
        });
    } else if (event.target.parentElement === select('.project-list')) {
        storage.map(project => {
            if (Number(event.target.id) === project.id) {
                project.DOM.title.value = event.target.value;
            }
        });
    } else {
        storage.map(project => {
            if (Number(event.target.id) === project.id) {
                project.DOM.sideMenuItem.value = event.target.value;
            }
        })
    }
}

// function updateProjectList(event) {
//     const projectList = select('.project-list');
//     const projectListItem = create('input', 'side-menu-item');
//     projectListItem.id = id;
//     projectListItem.value = 'Untitled Project';
//     currentProject = storage[storage.length - 1];
//     projectList.addEventListener('click', (event) => {
//         updateDOM();
//     });
//     projectList.append(projectListItem);
// }

const sideMenu = select('.side-menu');
const newProjectBtn = document.querySelector('.side-menu-add-project-btn');
newProjectBtn.addEventListener('click', createNewProject);

/*

side-menu-project button -> when clicked,
1) Saves the data that you have on the current page
2) loads the project onto the page

Save data function -> When called:
1) Takes the values of inputs, saves them in object

Load data function -> When called:
1) Takes values of object, creates DOM with it.

*/
