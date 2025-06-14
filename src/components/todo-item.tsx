import type { Todo } from "../interfaces/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo(id: string): void;
}

export default function TodoItem({ todo, toggleTodo }: TodoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <button
        title="Toggle"
        type="button"
        className={`border w-5 h-5 rounded-full cursor-pointer ${
          todo.isCompleted && "bg-orange-500"
        }`}
        onClick={() => toggleTodo(todo.id)}
      />
      <div className="border-b w-full pb-4">
        <p>{todo.title}</p>
        {todo.detail && <p className="text-slate-400">{todo.detail}</p>}
      </div>
    </div>
  );
}
