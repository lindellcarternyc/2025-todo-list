import { useNavigate } from "react-router";
import TodoForm from "../components/todo-form";
import type { CreateTodo } from "../interfaces/todo";
import { useTodoContext } from "../hooks/todo";

export default function NewTodoPage() {
  const { todoActions } = useTodoContext();

  const navigate = useNavigate();

  const onSubmit = async (data: CreateTodo) => {
    await todoActions.createTodo(data);
    navigate("/");
  };

  return <TodoForm type="create" onSubmit={onSubmit} />;
}
