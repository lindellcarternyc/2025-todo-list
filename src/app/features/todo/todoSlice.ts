import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../../interfaces/todo";
import type { RootState } from "../../store";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [
    {
      id: "todo1",
      isCompleted: true,
      title: "Lookup leon tree",
      detail: "Arriving: Lindell Carter's Home",
    },
    {
      id: "todo2",
      isCompleted: false,
      title: "Tube",
      detail: "12/21/24, 2:00 PM",
    },
    {
      id: "todo3",
      isCompleted: false,
      title: "Look up Greg Stout",
      detail: "1/14/25, 12:00 PM",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      console.log(state, action);
      const idx = state.todos.findIndex(
        (todo) => (todo.id = action.payload.id)
      );
      state.todos[idx].isCompleted = !state.todos[idx].isCompleted;
    },
  },
});

export const { toggleTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
