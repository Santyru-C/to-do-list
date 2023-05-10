import Project from './project';

const Project1 = new Project('Deportes');
console.log(Project1);
Project1.add_new_task('Jugar al teto', 'e.e', 'Hoy mismo', 'Alta');
Project1.add_new_task('Gimnasia', 'g');
console.log(Project1.taskList);
