import Project from './project';

export default class App {
  constructor() {
    this.inbox = [];
    this.todayTasks = [];
    this.weekTasks = [];
    this.projectList = [];
  }

  getProjectFromId(id) {
    const selectedProject = this.projectList.find((project) => project.id === id);

    return selectedProject;
  }

  addNewProject(projectTitle) {
    const newProject = new Project(projectTitle);
    this.projectList.push(newProject);

    return newProject;
  }

  removeProject(project) {
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
