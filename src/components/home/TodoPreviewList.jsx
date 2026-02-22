import TodoPreviewItem from "./TodoPreviewItem";

export default function TodoPreviewList({ todos }) {
  if (todos.length === 0) {
    return <p className="status">Список задач пуст</p>;
  }

  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <TodoPreviewItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
