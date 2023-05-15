import App from './app';

const TodoList = new App(); // set it as an IIFE later

const DomManipulator = (() => {
  let projectOnDisplay;
  // Buttons
  const menuBtn = document.getElementById('menu-btn');
  const newProjectButton = document.getElementById('new-project-btn');
  const newTaskButton = document.getElementsByClassName('new-task-btn')[0];
  const newTaskSubmit = document.getElementById('new-task-submit');
  const newTaskCancel = document.getElementById('new-task-cancel');

  // Containers
  const projectListContainer = document.getElementsByClassName('project-list-container')[0];
  const navContainer = document.getElementsByClassName('nav-container')[0];
  const newProjectModal = document.getElementsByClassName('new-project-modal')[0];
  const taskContainer = document.getElementsByClassName('task-container')[0];
  const newTaskModal = document.getElementsByClassName('new-task-modal')[0];

  const projectTitleDisplay = document.getElementsByClassName('project-title')[0];

  // Forms
  const newProjectForm = document.getElementById('new-project-form');
  const newTaskForm = document.getElementById('new-task-form');

  const toggleContainer = (container) => {
    const { classList } = container;
    const classArray = Array.from(classList);
    (classArray.includes('hidden')) ? classList.remove('hidden') : classList.add('hidden');
  };

  const removeProjectFromList = (e) => {
    // let the DOM alert the user if they are sure about this
    const targetItem = e.target.parentElement;
    const projectId = targetItem.dataset.boundId;

    // remove project from DOM and app storage
    const projectToRemove = TodoList.getProjectFromId(projectId);
    TodoList.removeProject(projectToRemove);
    console.log(TodoList.projectList);
    targetItem.remove();
  };

  const displayProject = (e) => {
    const { target } = e;
    // check if the label itself was clicked and not any child element
    if (target.classList.contains('project-list-item')) {
      const { boundId } = target.dataset;
      const boundProject = TodoList.getProjectFromId(boundId);
      projectOnDisplay = boundProject;
      // change displayed title
      projectTitleDisplay.textContent = boundProject.title;
      if (boundProject.taskList.length === 0) {
        const noTaskitem = document.createElement('li');
        noTaskitem.textContent = 'No Tasks to Display';
        taskContainer.appendChild(noTaskitem);
      }
      // display all project tasks
      //
    }
  };

  const showNewTaskModal = () => {
    console.log('testing');
  };

  const createProjectItem = (project) => {
    const projectItem = document.createElement('li');
    projectItem.dataset.boundId = project.id;
    projectItem.textContent = project.title;
    projectItem.classList.add('project-list-item');
    projectItem.addEventListener('click', displayProject);

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

  const createTaskFromData = () => {
    const rawData = Array.from(newTaskForm);
    const dataObj = rawData.reduce((acc, input) => ({ ...acc, [input.id.split('-')[1]]: input.value }), {}); // set object key as a substring ignoring "task-" suffix
    const newTask = projectOnDisplay.addNewTask(
      dataObj.title,
      dataObj.description,
      dataObj.duedate,
      dataObj.priority,
    );

    // set id new function

    console.log(newTask);
  };

  // always have a project displayed, set "general" or "inbox" as default

  const submitNewTask = (event) => {
    event.preventDefault();
    createTaskFromData();
    // create taskitem to display
    // add task item to display
  };

  // Event Listeners
  menuBtn.addEventListener('click', () => {
    toggleContainer(navContainer);
  });

  newProjectButton.addEventListener('click', () => {
    toggleContainer(newProjectModal);
  });

  newProjectForm.addEventListener('submit', submitNewProject);

  newTaskButton.addEventListener('click', () => { toggleContainer(newTaskModal); });

  newTaskSubmit.addEventListener('click', submitNewTask);

  newTaskCancel.addEventListener('click', () => { toggleContainer(newTaskModal); newTaskForm.reset(); }); // add new specific toggle function for form });
})();
