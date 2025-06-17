import { useContext } from "react";
import { TodoContext } from "../context/todo";

export const useTodoContext = () => useContext(TodoContext);
