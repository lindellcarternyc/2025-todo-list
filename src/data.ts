import { v4 as uuid } from "uuid";
import type { CreateTodo, Todo } from "./interfaces/todo";

const TODO_STORAGE_KEY = "LINDELL_CARTER_TODOS";

let TODOS: Todo[] = [
  {
    id: "todo-1",
    title: "First todo",
    detail: "When at home",
    isCompleted: true,
  },
  {
    id: "todo-2",
    title: "Second todo",
    detail: "06/14/25, 1:30PM",
    isCompleted: false,
  },
];

if (localStorage.getItem(TODO_STORAGE_KEY)) {
  const data = localStorage.getItem(TODO_STORAGE_KEY)!;
  const todos = JSON.parse(data);
  console.log(todos);
  TODOS = todos;
} else {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(TODOS));
}

export const getTodos = async () => {
  return TODOS;
};

export const getTodo = async ({ id }: { id: string }) => {
  const todo = TODOS.find((todo) => todo.id === id);
  return todo ?? null;
};

export const updateTodo = async (data: Partial<Todo> & { id: string }) => {
  const { id, ...updates } = data;

  const idx = TODOS.findIndex((todo) => todo.id === id);
  if (idx === undefined) return;

  const todo: Todo = {
    ...TODOS[idx],
    ...updates,
  };

  TODOS[idx] = todo;
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(TODOS));
};

export const createTodo = async (data: CreateTodo) => {
  const newTodo: Todo = {
    id: uuid(),
    ...data,
    isCompleted: false,
  };
  TODOS.push(newTodo);
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(TODOS));
};

export const deleteTodo = async (data: { id: string }) => {
  const idx = TODOS.findIndex((todo) => todo.id === data.id);
  if (idx === undefined) return;

  TODOS = TODOS.filter((todo) => todo.id !== data.id);
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(TODOS));
};
