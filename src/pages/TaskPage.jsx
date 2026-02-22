import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskEditor from "../components/task/TaskEditor";
import { useTodos } from "../context/TodosContext";

export default function TaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTodoById, updateTodo, deleteTodo, setError } = useTodos();

  const [todo, setTodo] = useState(null);
  const [taskText, setTaskText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setLocalError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTask() {
      try {
        setLoading(true);
        setLocalError("");
        const data = await getTodoById(id);
        if (!data) {
          navigate("/404", { replace: true });
          return;
        }

        if (active) {
          setTodo(data);
          setTaskText(data.title);
        }
      } catch (_err) {
        navigate("/404", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTask();
    return () => {
      active = false;
    };
  }, [id, getTodoById, navigate]);

  async function handleSave(event) {
    event.preventDefault();
    const title = taskText.trim();
    if (!title) return;

    try {
      setError("");
      setLocalError("");
      const updated = await updateTodo(todo.id, title);
      setTodo(updated);
    } catch (err) {
      setLocalError(err.message || "Ошибка обновления");
    }
  }

  async function handleDelete() {
    try {
      setError("");
      setLocalError("");
      await deleteTodo(todo.id);
      navigate("/", { replace: true });
    } catch (err) {
      setLocalError(err.message || "Ошибка удаления");
    }
  }

  return (
    <main className="page">
      <section className="card">
        <button className="backButton" type="button" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        {loading && <p className="status">Загрузка задачи...</p>}
        {!loading && error && <p className="status error">{error}</p>}

        {!loading && todo && (
          <TaskEditor
            value={taskText}
            onChange={setTaskText}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}
