import { useMemo, useState } from "react";
import TodoCreateForm from "../components/home/TodoCreateForm";
import TodoPreviewList from "../components/home/TodoPreviewList";
import TodoToolbar from "../components/home/TodoToolbar";
import { useTodos } from "../context/TodosContext";
import { useDebounce } from "../hooks/useDebounce";

export default function HomePage() {
  const { todos, loading, error, setError, createTodo } = useTodos();
  const [newText, setNewText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortEnabled, setSortEnabled] = useState(false);

  const debouncedSearch = useDebounce(searchText.trim().toLowerCase(), 350);

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(debouncedSearch)
    );

    if (!sortEnabled) return filtered;
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "ru"));
  }, [todos, debouncedSearch, sortEnabled]);

  async function handleCreate(event) {
    event.preventDefault();
    const title = newText.trim();
    if (!title) return;

    try {
      setError("");
      await createTodo(title);
      setNewText("");
    } catch (err) {
      setError(err.message || "Ошибка добавления");
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Todo List (JSON Server + Router)</h1>

        <TodoCreateForm value={newText} onChange={setNewText} onSubmit={handleCreate} />
        <TodoToolbar
          searchText={searchText}
          onSearch={setSearchText}
          sortEnabled={sortEnabled}
          onToggleSort={() => setSortEnabled((prev) => !prev)}
        />

        {loading && <p className="status">Загрузка...</p>}
        {!loading && error && <p className="status error">{error}</p>}

        {!loading && <TodoPreviewList todos={visibleTodos} />}
      </section>
    </main>
  );
}
