import { useState, type FormEvent } from "react";
import { TextInput } from "../components/text-input";
import type { CreateTodo, Todo } from "../interfaces/todo";
import Switcher from "./switcher";

type TodoFormProps =
  | {
      type: "create";
      onSubmit(data: CreateTodo): void;
    }
  | {
      type: "edit";
      onSubmit(data: Todo): void;
      todo: Todo;
    };

export default function NewTodo(props: TodoFormProps) {
  const [state, setState] = useState<Todo>(() => {
    if (props.type === "create") {
      return {
        id: "NEW TODO",
        title: "",
        detail: "",
        isCompleted: false,
      };
    }

    return props.todo;
  });

  const handleChange = (key: keyof Todo, value: Todo[keyof Todo]) => {
    return setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (!isValid()) return;

    props.onSubmit(state);
  };

  const isValid = () => {
    return state.title.trim().length >= 1;
  };

  return (
    <div className="flex justify-center items-center p-4 gap-4 flex-col">
      <h1 className="text-3xl">
        {props.type === "create" ? "New" : "Edit"} Todo
      </h1>
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
        {props.type === "edit" && (
          <div className="flex items-center gap-4">
            <label htmlFor="isCompleted">Completed:</label>
            <Switcher
              checked={state.isCompleted}
              onChange={() => handleChange("isCompleted", !state.isCompleted)}
              name="isCompleted"
              id="isCompleted"
            />
          </div>
        )}
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
            {props.type === "create" ? "Add" : "Edit"} Todo
          </button>
        </div>
      </form>
    </div>
  );
}
