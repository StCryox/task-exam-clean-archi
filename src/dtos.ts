export interface AddTaskRequest {
 	description: string;
  dueDate?: Date;
}

export interface UpdateTaskRequest {
	id: string;
	dueDate?: Date;
	state?: string;
}