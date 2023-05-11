import App from './app';

const todoList = new App(); // set it as an IIFE later
todoList.addNewProject('juancarlos');
todoList.addNewProject('projecto2');
const project1 = todoList.projectList[0];
const project2 = todoList.projectList[1];
project1.addNewTask('1', '2');
project2.addNewTask('3', '4');
console.log(todoList.getAllTasks());
console.log(todoList);

const menuBtn = document.getElementById('menu-btn');
const navContainer = document.getElementsByClassName('nav-container')[0];

function toggleNavContainer() {
  const { classList } = navContainer;
  const classArray = Array.from(classList);
  (classArray.includes('hidden')) ? classList.remove('hidden') : classList.add('hidden');
}
menuBtn.addEventListener('click', () => {
  toggleNavContainer();
});
