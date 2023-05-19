import Task from './task';

export default class Project {
  constructor(title) {
    this.title = title;
    this.taskList = [];
  }

  getTaskFromId(id) {
    const selectedTask = this.taskList.find((task) => task.id.toString() === id);
    return selectedTask;
  }

  addNewTask(title, description, dueDate = 'No Date', priority = 'Low') {
    const newTask = new Task(title, description, dueDate, priority);
    this.taskList.push(newTask);

    return newTask;
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
