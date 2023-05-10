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
}
