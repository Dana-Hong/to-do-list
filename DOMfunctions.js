function create(elementName, elementClass) {
    const element = document.createElement(elementName);
    element.classList.add(elementClass);
    return element;
}

function select(querySelector) {
    return document.querySelector(querySelector);
}

export { create, select };