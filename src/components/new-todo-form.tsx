import { useState, type FormEvent } from "react";
import { TextInput } from "../components/text-input";
import type { CreateTodo } from "../interfaces/todo";

interface NewTodoProps {
  onSubmit(data: CreateTodo): void;
}

export default function NewTodo({ onSubmit }: NewTodoProps) {
  const [state, setState] = useState<CreateTodo>({
    title: "",
    detail: "",
  });

  const handleChange = (key: keyof CreateTodo, value: string) => {
    return setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (!isValid()) return;

    onSubmit(state);
  };

  const isValid = () => {
    return state.title.trim().length >= 1;
  };

  return (
    <div className="flex justify-center items-center p-4 gap-4 flex-col">
      <h1 className="text-3xl">New Todo</h1>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          name="title"
          id="title"
          value={state.title}
          onChange={(value) => handleChange("title", value)}
        />
        <TextInput
          name="detail"
          id="detail"
          value={state.detail ?? ""}
          onChange={(value) => handleChange("detail", value)}
        />
        <div className="flex justify-end gap-4">
          <button
            type="button"
            title="Clear Form"
            className="border rounded-md px-4 py-2 cursor-pointer"
          >
            Clear
          </button>
          <button
            type="submit"
            className={`border rounded-md px-4 py-2 text-white ${
              isValid() === false
                ? "cursor-not-allowed bg-blue-400"
                : "cursor-pointer bg-blue-600"
            }`}
            disabled={!isValid()}
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}
