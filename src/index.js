import App from './app';

const todoList = new App(); // set it as an IIFE later

const DomManipulator = (() => {
  const menuBtn = document.getElementById('menu-btn');
  const newProjectButton = document.getElementById('new-project-btn');
  const navContainer = document.getElementsByClassName('nav-container')[0];
  const newProjectModal = document.getElementsByClassName('new-project-modal')[0];

  const toggleContainer = (container) => {
    const { classList } = container;
    const classArray = Array.from(classList);
    (classArray.includes('hidden')) ? classList.remove('hidden') : classList.add('hidden');
  };

  menuBtn.addEventListener('click', () => {
    toggleContainer(navContainer);
  });

  newProjectButton.addEventListener('click', () => {
    toggleContainer(newProjectModal);
  });
})();
