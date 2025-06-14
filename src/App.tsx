import TodoItem from "./components/todo-item";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectTodos } from "./app/features/todo/todoSlice";
import { useCallback, useMemo } from "react";

export default function App() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useMemo(useAppDispatch, []);

  // const completed = todos.filter((todo) => todo.isCompleted).length;

  const toggleTodo = useCallback(
    (id: string) => {
      // console.log("toggletodo", id);
      dispatch(() => toggleTodo(id));
    },
    [dispatch]
  );

  return (
    <div className="border">
      <header className="flex justify-between p-3">
        <h1 className="text-3xl">Reminders</h1>
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl">3</h2>
          <Link to="/new" className="cursor-pointer text-2xl">
            +
          </Link>
        </div>
      </header>
      <section>
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <TodoItem todo={todo} toggleTodo={toggleTodo} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
