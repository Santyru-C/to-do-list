import Project from './project';

export default class App {
  constructor() {
    this.inbox = [];
    this.todayTasks = [];
    this.weekTasks = [];
    this.projects = [];
  }

  add_new_project(projectTitle) {
    const new_project = new Project(projectTitle);
    this.projects.push(new_project);
  }
}
