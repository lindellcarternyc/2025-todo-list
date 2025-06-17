import { createContext, useEffect, useState } from "react";
import type { CreateTodo, Todo } from "../interfaces/todo";

import * as api from "../data";

type FetchState =
  | {
      type: "succees";
      data: {
        todos: Todo[];
      };
    }
  | {
      type: "failure";
      error: {
        message: string;
      };
    }
  | {
      type: "loading";
    };

interface TodoContextValue {
  todoState: FetchState;
  todoActions: {
    toggleTodo: (todo: Todo) => Promise<void>;
    deleteTodo: (todo: Todo) => Promise<void>;
    createTodo: (todo: CreateTodo) => Promise<void>;
  };
}

const noop = async () => {};

const TodoContext = createContext<TodoContextValue>({
  todoState: {
    type: "loading",
  },
  todoActions: {
    toggleTodo: noop,
    deleteTodo: noop,
    createTodo: noop,
  },
});

interface TodoContextProviderProps {
  children: React.ReactNode;
}

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todoState, setTodoState] = useState<FetchState>({
    type: "loading",
  });

  const fetchTodos = async () => {
    try {
      const todos = await api.getTodos();
      return setTodoState({
        type: "succees",
        data: { todos },
      });
    } catch (e) {
      console.log(e);
      setTodoState({
        type: "failure",
        error: { message: "Something went wrong!" },
      });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTodo = async (todo: Todo) => {
    const isCompleted = !todo.isCompleted;

    await api.updateTodo({
      ...todo,
      isCompleted,
    });

    const todos = await api.getTodos();
    setTodoState({
      type: "succees",
      data: { todos },
    });
  };

  const deleteTodo = async (todo: Todo) => {
    await api.deleteTodo(todo);
    await fetchTodos();
  };

  const createTodo = async (todo: CreateTodo) => {
    await api.createTodo(todo);
    await fetchTodos();
  };

  return (
    <TodoContext.Provider
      value={{
        todoState,
        todoActions: {
          toggleTodo,
          deleteTodo,
          createTodo,
        },
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext };
