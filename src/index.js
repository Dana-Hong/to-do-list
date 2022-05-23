import { create, select } from "../DOMfunctions.js";
import Project from "./data.js";
import { testProjectHeading } from "./DOM.js"

let dog = null;
let storage = [];
let id = 0;

function newProjectDomUpdate(event) {
    const project = new Project(id, "Untitled Project", "None");
    id++;
    const container = select('.project-container');
    const title = create('input', 'project-title');
    title.placeholder = project.title;
    const description = create('input', 'project-description');
    description.placeholder = 'Click to add a description...';
    const noteContainer = create('div', 'note-container');
    const noteList = create('ul', 'note-list');
    const textBox = create('li', 'note');
    const text = create('input', 'new-text');
    text.placeholder = "What do you need to do today?";
    text.classList.add('new-note-input');

    textBox.append(text);
    noteList.append(textBox);
    noteContainer.append(noteList);

    container.textContent = '';
    container.append(title, description, noteContainer);
    dog = container;

    const projectList = select('.project-list');
    const projectListItem = create('input', 'side-menu-item');
    projectListItem.value = project.title;
    projectList.append(projectListItem);
    projectList.addEventListener('click', (event) => {
        console.log(event.target.value);
    });
    storage.push(project);
    event.stopPropagation();

}


function saveData() {
    if (dog.firstElementChild.value) {
        storage[0].title = dog.firstElementChild.value;
    }
    storage[0].description = dog.children[1].value;
    console.log(storage, storage[0]);
}


function createNewProject(event) {
    newProjectDomUpdate(event); 
}

const window = select('body');
const sideMenu = select('.side-menu');
window.addEventListener('click', saveData);
const newProjectBtn = document.querySelector('.side-menu-add-project-btn');
newProjectBtn.addEventListener('click', createNewProject);
console.log(testProjectHeading);



/*

side-menu-project button -> when clicked,
1) Saves the data that you have on the current page
2) loads the project onto the page

Save data function -> When called:
1) Takes the values of inputs, saves them in object

Load data function -> When called:
1) Takes values of object, creates DOM with it.

*/