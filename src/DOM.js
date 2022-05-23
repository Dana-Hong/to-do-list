import { create, select } from "../DOMfunctions.js";
import Project from "./data.js";

const testData = new Project('First project', 'Random stuff', 'May 10', 'Very important');
const testProjectHeading = create('div', 'project-name');

testProjectHeading.textContent = testData.name;
document.body.append(testProjectHeading);

let DOM = {
    projectContainer: select('.project-container'),
    projectTitle: create('input', 'project-name'),
    projectDescription: create()
}

export { testProjectHeading };
