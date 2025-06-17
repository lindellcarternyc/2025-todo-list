import { Link } from "react-router";
import TodoItem from "../components/todo-item";

import type { Todo } from "../interfaces/todo";
import { useTodoContext } from "../hooks/todo";

export default function TodosPage() {
  const { todoState, todoActions } = useTodoContext();

  const handleToggleTodo = (todo: Todo) => {
    todoActions.toggleTodo(todo);
  };

  const handleDeleteTodo = (todo: Todo) => {
    todoActions.deleteTodo(todo);
  };

  const completed =
    todoState.type === "succees"
      ? todoState.data.todos.filter((todo) => todo.isCompleted).length
      : "-";

  return (
    <div className="border">
      <header className="flex justify-between p-3">
        <h1 className="text-3xl">Reminders</h1>
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl">{completed}</h2>
          <Link to="/new" className="cursor-pointer text-2xl">
            +
          </Link>
        </div>
      </header>
      <section>
        {todoState.type === "loading" && <p>Loading...</p>}
        {todoState.type === "failure" && <p>{todoState.error.message}</p>}
        {todoState.type === "succees" && (
          <ul>
            {todoState.data.todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <TodoItem
                    todo={todo}
                    toggleTodo={handleToggleTodo}
                    deleteTodo={handleDeleteTodo}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
