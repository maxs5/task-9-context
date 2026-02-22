import { Link } from "react-router-dom";

export default function TodoPreviewItem({ todo }) {
  return (
    <li className="todoItem">
      <Link className="todoTextLink" to={`/task/${todo.id}`}>
        {todo.title}
      </Link>
    </li>
  );
}
