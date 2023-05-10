import Project from './project';

export default class App {
  constructor() {
    this.inbox = [];
    this.todayTasks = [];
    this.weekTasks = [];
    this.projectList = [];
  }

  add_new_project(projectTitle) {
    const newProject = new Project(projectTitle);
    this.projectList.push(newProject);
  }

  remove_project(project) {
    // let the DOM alert the user if they are sure about this
    const indexToRemove = this.projectList.indexOf(project);
    this.projectList.splice(indexToRemove, 1);
  }
}
