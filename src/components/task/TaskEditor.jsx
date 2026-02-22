export default function TaskEditor({ value, onChange, onSave, onDelete }) {
  return (
    <section className="taskDetails">
      <h1>Задача</h1>
      <form className="taskForm" onSubmit={onSave}>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={7}
          placeholder="Полный текст задачи"
        />
        <div className="actions">
          <button type="submit">Сохранить</button>
          <button className="dangerButton" type="button" onClick={onDelete}>
            Удалить
          </button>
        </div>
      </form>
    </section>
  );
}
