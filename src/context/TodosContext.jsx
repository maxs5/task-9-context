import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  getTodoById as getTodoByIdRequest,
  getTodos,
  updateTodo as updateTodoRequest
} from "../services/todoApi";

const TodosContext = createContext(null);

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true);
        setError("");
        const list = await getTodos();
        setTodos(list);
      } catch (err) {
        setError(err.message || "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  async function createTodo(title) {
    const created = await createTodoRequest(title);
    setTodos((prev) => [...prev, created]);
    return created;
  }

  async function updateTodo(id, title) {
    const updated = await updateTodoRequest(id, title);
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    return updated;
  }

  async function deleteTodo(id) {
    await deleteTodoRequest(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  async function getTodoById(id) {
    const local = todos.find((todo) => String(todo.id) === String(id));
    if (local) return local;
    return getTodoByIdRequest(id);
  }

  const value = useMemo(
    () => ({
      todos,
      loading,
      error,
      setError,
      createTodo,
      updateTodo,
      deleteTodo,
      getTodoById
    }),
    [todos, loading, error]
  );

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos должен использоваться внутри TodosProvider");
  }
  return context;
}
