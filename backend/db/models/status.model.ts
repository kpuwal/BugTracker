// status options: ['pending', 'toDo', 'inProgress', 'done']

export default class Status {
  constructor(
    public toDo: boolean,
    public doing: boolean,
    public done: boolean) {}
}