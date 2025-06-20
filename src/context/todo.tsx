import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CreateTodo, Todo } from "../interfaces/todo";

import * as db from "../db.ts";

type FetchState<T> =
  | {
      type: "succees";
      data: T;
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
  todoState: FetchState<Record<string, Todo>>;
  fetchTodoState: FetchState<Todo>;
  todoActions: {
    toggleTodo: (todo: Todo) => Promise<void>;
    deleteTodo: (todo: Todo) => Promise<void>;
    createTodo: (todo: CreateTodo) => Promise<void>;
    fetchTodo: ({ id }: { id: string }) => Promise<void>;
    updateTodo: (todo: Todo) => Promise<void>;
  };
}

const noop = async () => {};

const TodoContext = createContext<TodoContextValue>({
  todoState: {
    type: "loading",
  },
  fetchTodoState: {
    type: "loading",
  },
  todoActions: {
    toggleTodo: noop,
    deleteTodo: noop,
    createTodo: noop,
    fetchTodo: noop,
    updateTodo: noop,
  },
});

interface TodoContextProviderProps {
  children: React.ReactNode;
}

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todoState, setTodoState] = useState<FetchState<Record<string, Todo>>>({
    type: "loading",
  });

  const [fetchTodoState, setFetchTodoState] = useState<FetchState<Todo>>({
    type: "loading",
  });

  useEffect(() => {
    db.getTodos((todos) => {
      setTodoState({
        type: "succees",
        data: todos,
      });
    });
  }, []);

  const toggleTodo = useCallback(async (todo: Todo) => {
    const isCompleted = !todo.isCompleted;

    await db.updateTodo({
      ...todo,
      isCompleted,
    });
  }, []);

  const deleteTodo = useCallback(async (todo: Todo) => {
    await db.deleteTodo(todo);
  }, []);

  const createTodo = useCallback(async (todo: CreateTodo) => {
    await db.createTodo(todo);
  }, []);

  const fetchTodo = useCallback(async ({ id }: { id: string }) => {
    setFetchTodoState({ type: "loading" });
    // const todo = await api.getTodo({ id });

    setFetchTodoState({ type: "loading" });

    const todo = await db.getTodo(id);
    if (todo)
      return setFetchTodoState({
        type: "succees",
        data: todo,
      });

    return setFetchTodoState({
      type: "failure",
      error: { message: "Something went wrong!" },
    });
  }, []);

  const updateTodo = useCallback(async (todo: Todo) => {
    await db.updateTodo(todo);
  }, []);

  const todoActions = useMemo(
    () => ({
      toggleTodo,
      deleteTodo,
      createTodo,
      fetchTodo,
      updateTodo,
    }),
    [createTodo, deleteTodo, fetchTodo, toggleTodo, updateTodo]
  );

  return (
    <TodoContext.Provider
      value={{
        todoState,
        fetchTodoState,
        todoActions,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext };
