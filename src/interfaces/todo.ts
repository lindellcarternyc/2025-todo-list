export interface Todo {
  id: string;
  isCompleted: boolean;
  title: string;
  detail?: string;
}

export type CreateTodo = Pick<Todo, "title" | "detail">;
