import Task from './task';

export default class Project {
  constructor(title) {
    this.title = title;
    this.id = Date.now(); // use as a unique identifier
    this.taskList = [];
  }

  addNewTask(title, description, dueDate = 'No Date', priority = 'Low') {
    const newTask = new Task(title, description, dueDate, priority);
    this.taskList.push(newTask);
  }

  removeTask(task) {
    if (this.taskList.includes(task)) {
      const indexToRemove = this.taskList.indexOf(task);
      this.taskList.splice(indexToRemove, 1);
    } else { console.log('ERROR: That Item Does Not Exist'); }
  }

  get tasks() {
    return this.taskList;
  }
}
