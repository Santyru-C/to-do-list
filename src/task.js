// in this scenario the use of classses will be usefull
// due to multiple instantiations of the same object

export default class Task {
  constructor(title, description, dueDate = 'No date', priority = 'Low') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
