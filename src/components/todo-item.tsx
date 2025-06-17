import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import type { Todo } from "../interfaces/todo";
import { Link } from "react-router";

interface TodoItemProps {
  todo: Todo;
  toggleTodo(todo: Todo): void;
  deleteTodo(todo: Todo): void;
}

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-2">
      <button
        title="Toggle"
        type="button"
        className={`border w-5 h-5 rounded-full cursor-pointer ${
          todo.isCompleted && "bg-orange-500"
        }`}
        onClick={() => toggleTodo(todo)}
      />
      <div className="border-b w-full pb-4 flex justify-between center">
        <div>
          <p>{todo.title}</p>
          {todo.detail && <p className="text-slate-400">{todo.detail}</p>}
        </div>

        <div className="flex gap-2 items-center">
          <Link
            to={`/edit/${todo.id}`}
            type="button"
            title="Edit todo"
            className="cursor-pointer bg-slate-600 text-white rounded-md p-1"
          >
            <PencilIcon className="w-6" />
          </Link>
          <button
            type="button"
            className="cursor-pointer bg-red-500 text-white p-1 rounded-md"
            onClick={() => deleteTodo(todo)}
            title="Delete todo"
          >
            <TrashIcon className="w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
