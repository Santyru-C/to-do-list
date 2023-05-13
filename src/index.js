import App from './app';

const TodoList = new App(); // set it as an IIFE later

const DomManipulator = (() => {
  // Buttons
  const menuBtn = document.getElementById('menu-btn');
  const newProjectButton = document.getElementById('new-project-btn');
  // Containers
  const newProjectForm = document.getElementById('new-project-form');
  const projectListContainer = document.getElementsByClassName('project-list-container')[0];
  const navContainer = document.getElementsByClassName('nav-container')[0];
  const newProjectModal = document.getElementsByClassName('new-project-modal')[0];

  const toggleContainer = (container) => {
    const { classList } = container;
    const classArray = Array.from(classList);
    (classArray.includes('hidden')) ? classList.remove('hidden') : classList.add('hidden');
  };

  const removeProjectFromList = (e) => {
    // let the DOM alert the user if they are sure about this
    const targetItem = e.target.parentElement;
    const projectId = targetItem.dataset.boundId;

    const projectToRemove = TodoList.getProjectFromId(projectId);
    TodoList.removeProject(projectToRemove);
    console.log(TodoList.projectList);
    targetItem.remove();
  };

  const createProjectItem = (project) => {
    const projectItem = document.createElement('li');
    projectItem.dataset.boundId = project.id;
    projectItem.textContent = project.title;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('project-remove-btn');
    removeBtn.textContent = 'x';
    removeBtn.addEventListener('click', removeProjectFromList);
    projectItem.appendChild(removeBtn);

    return projectItem;
  };

  const addToContainer = (btn, container) => {
    container.appendChild(btn);
  };

  const submitNewProject = (event) => {
    event.preventDefault();
    const newProjectName = document.getElementById('new-project-name');
    const newProject = TodoList.addNewProject(newProjectName.value);
    const projectButton = createProjectItem(newProject);
    addToContainer(projectButton, projectListContainer);

    toggleContainer(newProjectModal);
    newProjectName.value = '';
  };

  const displayAllProjects = () => {
    // load all stored projects when page first loads
    const storedProjects = TodoList.projectList;

    storedProjects.forEach((project) => {
      const projectItem = createProjectItem(project);
      addToContainer(projectItem, projectListContainer);
    });
  };

  // Event Listeners
  menuBtn.addEventListener('click', () => {
    toggleContainer(navContainer);
  });

  newProjectButton.addEventListener('click', () => {
    toggleContainer(newProjectModal);
  });

  newProjectForm.addEventListener('submit', submitNewProject);
})();
