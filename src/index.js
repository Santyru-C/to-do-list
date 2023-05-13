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

  const createProjectBtn = (project) => {
    const projectBtn = document.createElement('button');
    projectBtn.dataset.boundId = project.id;
    projectBtn.textContent = project.title;

    return projectBtn;
  };

  const addBtnToContainer = (btn, container) => {
    container.appendChild(btn);
  };

  const submitNewProject = (event) => {
    event.preventDefault();
    const newProjectName = document.getElementById('new-project-name');
    const newProject = TodoList.addNewProject(newProjectName.value);
    const projectButton = createProjectBtn(newProject);
    addBtnToContainer(projectButton, projectListContainer);

    toggleContainer(newProjectModal);
    newProjectName.value = '';
  };

  const displayAllProjects = () => {
    // load all stored projects when page first loads
    const storedProjects = TodoList.projectList;

    storedProjects.forEach((project) => {
      const projectBtn = createProjectBtn(project);
      addBtnToContainer(projectBtn, projectListContainer);
    });
  };

  // addProjectToContainer
  // removeProjectFromContainer

  // Event Listeners
  menuBtn.addEventListener('click', () => {
    toggleContainer(navContainer);
  });

  newProjectButton.addEventListener('click', () => {
    toggleContainer(newProjectModal);
  });

  newProjectForm.addEventListener('submit', submitNewProject);
})();
