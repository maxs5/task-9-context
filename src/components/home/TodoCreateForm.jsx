export default function TodoCreateForm({ value, onChange, onSubmit }) {
  return (
    <form className="createForm" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Введите новую задачу"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
