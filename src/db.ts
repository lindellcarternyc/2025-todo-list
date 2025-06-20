// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import type { CreateTodo, Todo } from "./interfaces/todo";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABozPLKdDtHEZ6M3HnqUSOlkLqxsS_PT8",
  authDomain: "todo-it-6a043.firebaseapp.com",
  databaseURL: "https://todo-it-6a043-default-rtdb.firebaseio.com",
  projectId: "todo-it-6a043",
  storageBucket: "todo-it-6a043.firebasestorage.app",
  messagingSenderId: "128874289480",
  appId: "1:128874289480:web:a50d988b157c7fdfac7b7d",
  measurementId: "G-9D7GFCCMYH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const todosRef = ref(db, "todos/");

export const getTodos = async (cb: (data: Record<string, Todo>) => void) => {
  return onValue(ref(db, "todos"), (snapshot) => {
    const data = snapshot.val();
    cb(data);
  });
};

export const getTodo = async (id: string) => {
  const todo = await get(child(ref(db), `todos/${id}`));
  if (todo.exists()) {
    return todo.val();
  }
  return null;
};

export const createTodo = async (todo: CreateTodo) => {
  const newPostKey = push(child(ref(db), "todos")).key;
  const updates: Record<string, unknown> = {};
  updates[`/todos/${newPostKey}`] = {
    ...todo,
    id: newPostKey,
  };

  return update(ref(db), updates);
};

export const updateTodo = async (todo: Todo) => {
  set(ref(db, `todos/${todo.id}`), todo);
};

export const deleteTodo = (todo: Todo) => {
  remove(ref(db, `todos/${todo.id}`));
};
