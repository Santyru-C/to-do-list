import { getHostname } from 'webpack-dev-server';
import App from './app';

const todoList = new App(); // set it as an IIFE later

const DomManipulator = (() => {
  // Buttons
  const menuBtn = document.getElementById('menu-btn');
  const newProjectButton = document.getElementById('new-project-btn');
  const newProjectSubmit = document.getElementById('new-project-submit');
  // Containers
  const navContainer = document.getElementsByClassName('nav-container')[0];
  const newProjectModal = document.getElementsByClassName('new-project-modal')[0];

  const toggleContainer = (container) => {
    const { classList } = container;
    const classArray = Array.from(classList);
    (classArray.includes('hidden')) ? classList.remove('hidden') : classList.add('hidden');
  };

  const submitNewProject = (event) => {
    event.preventDefault();
    const newProjectForm = getElementById('new-project-form');
  };

  // Event Listeners
  menuBtn.addEventListener('click', () => {
    toggleContainer(navContainer);
  });

  newProjectButton.addEventListener('click', () => {
    toggleContainer(newProjectModal);
  });

  newProjectSubmit.addEventListener('click', submitNewProject);
})();
