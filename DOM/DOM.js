import { createNewProject, select } from "./DOMfunctions.js";
import { createDashBoard, createSideMenu, createNewProjectButton, createProjectContainer } from "./DOMelements.js";

const loadPage = () => {
    const dashboard = createDashBoard();
    const sideMenuContainer = createSideMenu();
    const newProjectBtn = createNewProjectButton();
    const projectContainer = createProjectContainer();
    newProjectBtn.addEventListener('click', createNewProject);
    sideMenuContainer.append(newProjectBtn);
    projectContainer.append();
    dashboard.append(sideMenuContainer, projectContainer);
    select('body').append(dashboard);
    createNewProject();
}

export { loadPage };