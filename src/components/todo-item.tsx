import type { Todo } from "../interfaces/todo";

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
    <div className="flex items-start gap-3 p-2">
      <button
        title="Toggle"
        type="button"
        className={`border w-5 h-5 rounded-full cursor-pointer ${
          todo.isCompleted && "bg-orange-500"
        }`}
        onClick={() => toggleTodo(todo)}
      />
      <div className="border-b w-full pb-4 flex justify-between items-baseline">
        <div>
          <p>{todo.title}</p>
          {todo.detail && <p className="text-slate-400">{todo.detail}</p>}
        </div>
        <button
          type="button"
          className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded-md"
          onClick={() => deleteTodo(todo)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
