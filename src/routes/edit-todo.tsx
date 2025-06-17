import { useEffect } from "react";
import TodoForm from "../components/todo-form";
import type { Todo } from "../interfaces/todo";
import { useTodoContext } from "../hooks/todo";
import { useNavigate, useParams } from "react-router";

export default function EditTodoPage() {
  const { todoId } = useParams();

  const { fetchTodoState, todoActions } = useTodoContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!todoId) return;
    todoActions.fetchTodo({ id: todoId });
  }, [todoActions, todoId]);

  const onSubmit = async (data: Todo) => {
    await todoActions.updateTodo(data);
    navigate("/");
  };

  return (
    <>
      {fetchTodoState.type === "loading" && <p>Loading!</p>}
      {fetchTodoState.type === "failure" && (
        <p>{fetchTodoState.error.message}</p>
      )}
      {fetchTodoState.type === "succees" && (
        <TodoForm type="edit" todo={fetchTodoState.data} onSubmit={onSubmit} />
      )}
    </>
  );
}
