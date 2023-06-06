import { State } from './State';

export class Task {
  get tag() { return this._tag; }
  get description() { return this._description; }
  get state() { return this._state; }
  get subtasks() { return this._subtasks; }
  get dueDate() { return this._dueDate; }
  get closeDate() { return this._closeDate; }
  
  constructor(
    readonly id: string,
    private _description: string,
    private _state: State,
    private _subtasks: Task[],
    readonly created: Date,
    private _tag?: string,
    private _dueDate?: Date,
    private _closeDate?: Date,
  ) {}
}