import { create, select, updateDOM, toggleStyle, increaseSize } from "./DOMfunctions.js";
import { 
    compareAsc,
    format,
    isToday,
    isThisWeek,
    isBefore,
    endOfToday,
    add,
    getDate
    } from '../node_modules/date-fns';

const createDashBoard = () => {
    const dashboard = create('div', 'dashboard');
    return dashboard;
}

const createSideMenu = () => {
    const sideMenuContainer = create('div', 'side-menu-container');
    const logo = create('div', 'logo');
    const sideMenuNotebooks = create('div', 'side-menu', 'notebooks');
    const notebooksTitle = create('div', 'side-menu-title');
    notebooksTitle.textContent = 'Notebooks';
    const notebookList = create('ul', 'notebook-list');
    sideMenuNotebooks.append(notebooksTitle, notebookList);
    const sideMenuProjects = create('div', 'side-menu', 'projects');
    const projectsTitle = create('div', 'side-menu-title');
    projectsTitle.textContent = 'Projects';
    const projectsList = create('ul', 'project-list');
    sideMenuProjects.append(projectsTitle, projectsList);
    sideMenuContainer.append(logo, sideMenuNotebooks, sideMenuProjects);
    return sideMenuContainer;
}

const createNewProjectButton = () => {
    const newProjectBtn = create('button', 'side-menu-add-project-btn');
    newProjectBtn.textContent = '+';
    return newProjectBtn;
}

const createProjectContainer = () => {
    const projectContainer = create('div', 'project-container');
    return projectContainer;
}

const createProjectDiv = () => {
    const project = create('div', 'project');
    const title = createTitle();
    const noteContainer = createNoteContainer();
    const description = createDescription();
    project.append(title, description, noteContainer);
    return { project, title, description, noteContainer };
}

const createTitle = () => {
    const titleContainer = create('div', 'title-container');
    const title = create('textarea', 'project-title');
    title.placeholder = 'Untitled Project';
    title.addEventListener('keydown', (event) => {
        if (event.key === "Tab" || event.key === "Enter") {
            event.preventDefault();
            select('.project-description').focus();
        }
        console.log(event.key);
    })
    // title.addEventListener('keydown', increaseSize);
    title.oninput = increaseSize;
    title.addEventListener('keyup', updateDOM);
    return title;
}

const createNoteContainer = () => {
    const noteContainer = create('div', 'note-container');
    const note = createNewNote();
    const noteList = create('ul', 'note-list');
    note.children[1].placeholder = "What do you need to do today?";
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
    description.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            select('.note-list').firstElementChild.children[1].focus();
        }
    })
    description.addEventListener('keydown', increaseSize);
    description.maxLength = 210;
    return description;
}

const handleKeyboard = (event) => {
    const noteList = select('.note-list');
    if (event.shiftKey) {
    } else if ((event.key === "Enter" || event.key === "Tab")) {
        if (event.target === noteList.lastElementChild.children[1]) {
            event.preventDefault();
            noteList.append(createNewNote());
            noteList.lastElementChild.children[1].focus();
        } else {
            event.target.parentElement.nextElementSibling.focus();
        }
    } else if ((event.key === 'Backspace') && !event.target.value) {
        if (noteList.children.length > 1) {
            noteList.lastElementChild.remove();
            noteList.lastElementChild.children[1].focus();
        } else {
            noteList.lastElementChild.children[1].focus();
        }
    }
}

const createNewNote = () => {
    const textBox = create('li', 'note');
    const checkbox = create('input', 'checkbox');
    const time = create('div', 'time');
    time.textContent = format(new Date, "MM-dd-yyyy");
    checkbox.addEventListener('click', toggleStyle);
    checkbox.addEventListener('keydown', toggleStyle);
    const text = create('textarea', 'new-note-input');
    text.addEventListener('keydown', handleKeyboard);
    text.addEventListener('focus', (event) => {
        if (!event.target.value) {
            event.target.style.height = select('.checkbox').style.height;
        }
    })
    text.oninput = increaseSize;
    checkbox.type = 'checkbox';
    textBox.append(checkbox, text, time);
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

export {
    createDashBoard,
    createSideMenu,
    createNewProjectButton,
    createProjectContainer,
    createProjectDiv,
    createTitle,
    createNoteContainer,
    createDescription,
    createProjectListItem,
    createProjectDOM
};