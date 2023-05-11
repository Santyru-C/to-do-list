import Project from './project';

export default class App {
  constructor() {
    this.inbox = [];
    this.todayTasks = [];
    this.weekTasks = [];
    this.projectList = [];
  }

  addNewProject(projectTitle) {
    const newProject = new Project(projectTitle);
    this.projectList.push(newProject);
  }

  removeProject(project) {
    // let the DOM alert the user if they are sure about this
    const indexToRemove = this.projectList.indexOf(project);
    this.projectList.splice(indexToRemove, 1);
  }

  getAllTasks() {
    this.projectList.forEach((project) => {
      this.inbox.push(...project.tasks);
    });

    return this.inbox;
  }
}
