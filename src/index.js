import App from './app';

const TodoList = new App();
// new App(); // set it as an IIFE later

window.addEventListener('click', () => {
  console.log('hello');
});

const DomManipulator = (() => {
  let projectOnDisplay;
  // Buttons
  const menuBtn = document.getElementById('menu-btn');
  const newProjectButton = document.getElementById('new-project-btn');
  const newTaskButton = document.getElementsByClassName('new-task-btn')[0];
  const newTaskSubmit = document.getElementById('new-task-submit');
  const newTaskCancel = document.getElementById('new-task-cancel');
  const inboxTab = document.getElementsByClassName('tab inbox')[0];

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

  // tools
  const elementFromTemplate = (htmlString) => {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();

    // return as an Element to access all dedicated editor tools
    return template.content.firstElementChild;
  };

  const extractFormData = (form) => {
    const rawData = Array.from(form);
    // set object key as a substring ignoring "*-" suffix
    const dataObj = rawData.reduce((acc, input) => ({ ...acc, [input.id.split('-')[1]]: input.value }), {});

    return dataObj;
  };

  const bindWithId = (obj, elem) => {
    const newId = Date.now();
    obj.id = newId;
    elem.dataset.boundId = newId;
  };

  // templates
  const taskElementTemplate = `
    <div class="task-element">
      <div class="top-container">
        <div class="left">
          <div class="task-title"></div>
        </div>
        <div class="right">
          <div class="task-duedate"></div>
          <div class="task-priority"></div>
          <button class="task-remove-btn">x</button>
        </div>
      </div>
      <div class="bottom-container hidden">
        <div class="task-description"></div>
      </div>
    </div>
  `;

  const projectElementTemplate = `
    <li class="project-list-element">
      <div class="project-element-title"></div>
      <button class="project-remove-btn">x</button>
    </li>
  `;

  // Project Logic ------
  const getSiblingList = (element) => {
    const parentChildren = Array.from(element.parentElement.children);
    const siblingList = parentChildren.filter((child) => child !== element);
    return siblingList;
  };

  const clearProjectDisplay = () => {
    taskContainer.replaceChildren();
    projectTitleDisplay.textContent = '';
  };

  const displayAllTasks = (taskList) => {
    taskList.forEach((taskObj) => {
      const taskElement = createTaskElement(taskObj);
      taskElement.dataset.boundId = taskObj.id;
      taskContainer.appendChild(taskElement);
    });
  };

  const testdisplay = (project) => {
    if (projectOnDisplay !== project) {
      clearProjectDisplay();
      projectOnDisplay = project;
      // change displayed title
      projectTitleDisplay.textContent = project.title;
      const tasksToDisplay = project.taskList;
      displayAllTasks(tasksToDisplay);

      if (project.taskList.length === 0) {
        const noTaskitem = document.createElement('li');
        noTaskitem.textContent = 'No Tasks to Display';
        taskContainer.appendChild(noTaskitem);
      }
    }
  };

  const removeProjectFromList = (e) => {
    // let the DOM alert the user if they are sure about this
    const targetElement = e.target.closest('[data-bound-id]');
    const projectId = targetElement.dataset.boundId;
    const projectToRemove = TodoList.getProjectFromId(projectId);

    // display sibling project if posible
    const siblingElement = getSiblingList(targetElement)[0];
    if (siblingElement !== undefined) {
      const siblingProject = TodoList.getProjectFromId(siblingElement.dataset.boundId);
      testdisplay(siblingProject);
    } else {
      clearProjectDisplay();
      projectOnDisplay = undefined;
    }

    // remove project
    TodoList.removeProject(projectToRemove);
    targetElement.remove();
  };

  const displayProject = (e) => {
    // put this logic inside the event listener
    let { target } = e;
    // check if the label itself was clicked and not any child element
    if (!target.classList.contains('project-remove-btn')) {
      // get li if the clicked element is a child element
      target = target.classList.contains('project-list-element') ? target : target.parentElement;

      const { boundId } = target.dataset;
      const boundProject = TodoList.getProjectFromId(boundId);

      testdisplay(boundProject);
    }
  };

  const createProjectElement = (project) => {
    const newProjectElement = elementFromTemplate(projectElementTemplate);
    // custom values
    const elementTitle = newProjectElement.getElementsByClassName('project-element-title')[0];
    const elementBtn = newProjectElement.getElementsByClassName('project-remove-btn')[0];

    // set values
    elementTitle.textContent = project.title;
    // Event listeners
    elementBtn.addEventListener('click', removeProjectFromList);
    newProjectElement.addEventListener('click', displayProject);

    return newProjectElement;
  };

  const submitNewProject = (event) => {
    event.preventDefault();

    // create necessary objects and elements
    const projectData = extractFormData(newProjectForm);
    const projectObj = TodoList.addNewProject(projectData.title);
    const projectElement = createProjectElement(projectObj);
    // bind both elements for functionality
    bindWithId(projectObj, projectElement);

    projectListContainer.appendChild(projectElement);
    const test = JSON.stringify(projectObj); // --------
    console.log(JSON.parse(test));

    toggleContainer(newProjectModal);
    newProjectForm.reset();
  };

  // ---- Task logic
  const toggleTaskModal = () => {
    toggleContainer(newTaskModal);
    newTaskForm.reset();
  };

  const extractTaskData = () => {
    const rawData = Array.from(newTaskForm);
    const dataObj = rawData.reduce((acc, input) => ({ ...acc, [input.id.split('-')[1]]: input.value }), {}); // set object key as a substring ignoring "task-" suffix
    return dataObj;
  };

  const taskObjectFromData = (dataObj) => {
    const newTask = projectOnDisplay.addNewTask(
      dataObj.title,
      dataObj.description,
      dataObj.duedate,
      dataObj.priority,
    );

    return newTask;
  };

  // always have a project displayed, set "general" or "inbox" as default

  const createTaskElement = (task) => {
    // set up DOM element containing all information contained in the task object
    const newTaskElement = elementFromTemplate(taskElementTemplate);
    const title = newTaskElement.getElementsByClassName('task-title')[0];
    const date = newTaskElement.getElementsByClassName('task-duedate')[0];
    const priority = newTaskElement.getElementsByClassName('task-priority')[0];
    const description = newTaskElement.getElementsByClassName('task-description')[0];
    const removeBtn = newTaskElement.getElementsByClassName('task-remove-btn')[0];

    title.textContent = task.title;
    date.textContent = task.duedate;
    priority.textContent = task.priority;
    description.textContent = task.description;

    removeBtn.addEventListener('click', taskRemoveEvent);
    return newTaskElement;
  };

  const submitNewTask = () => {
    // create necessary items
    const taskData = extractTaskData();
    const taskObject = taskObjectFromData(taskData);
    const taskElement = createTaskElement(taskData);

    bindWithId(taskObject, taskElement);
    taskObject.projectId = projectOnDisplay.id;

    // display task element
    taskContainer.appendChild(taskElement);
  };

  const taskSubmitEvent = (event) => {
    event.preventDefault();
    if (projectOnDisplay !== undefined) {
      submitNewTask();
    }
  };

  const taskRemoveEvent = (e) => {
    const targetElement = e.target.closest('[data-bound-id]');
    const taskId = targetElement.dataset.boundId;
    const taskToRemove = projectOnDisplay.getTaskFromId(taskId);
    const taskOwner = TodoList.getProjectFromId(taskToRemove.projectId);
    targetElement.remove();
    taskOwner.removeTask(taskToRemove);
    console.log(taskOwner);
  };

  // general tabs

  const displayInbox = () => {
    testdisplay(TodoList.inboxProject);
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

  newTaskForm.addEventListener('submit', taskSubmitEvent);

  newTaskCancel.addEventListener('click', toggleTaskModal); // add new specific toggle function for form });

  inboxTab.addEventListener('click', displayInbox);
})();
