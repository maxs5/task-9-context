const API = "http://localhost:3001/todos";

export async function getTodos() {
  const response = await fetch(API);
  if (!response.ok) throw new Error("Не удалось загрузить список дел");
  return response.json();
}

export async function getTodoById(id) {
  const response = await fetch(`${API}/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Не удалось загрузить задачу");
  return response.json();
}

export async function createTodo(title) {
  const response = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  if (!response.ok) throw new Error("Не удалось добавить дело");
  return response.json();
}

export async function updateTodo(id, title) {
  const response = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  if (!response.ok) throw new Error("Не удалось обновить дело");
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Не удалось удалить дело");
}
