import Task from './task';

export default class Project {
  constructor(title) {
    this.title = title;
    this.taskList = [];
  }

  add_new_task(title, description, dueDate = 'No Date', priority = 'Low') {
    const newTask = new Task(title, description, dueDate, priority);
    this.taskList.push(newTask);
  }

  remove_task(task) {
    if (this.taskList.includes(task)) {
      const indexToRemove = this.taskList.indexOf(task);
      this.taskList.splice(indexToRemove, 1);
    } else { console.log('ERROR: That Item Does Not Exist'); }
  }
}
