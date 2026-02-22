export default function TodoToolbar({
  searchText,
  onSearch,
  sortEnabled,
  onToggleSort
}) {
  return (
    <div className="tools">
      <input
        value={searchText}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Поиск по фразе"
      />
      <button type="button" onClick={onToggleSort}>
        {sortEnabled ? "Сортировка: ВКЛ" : "Сортировка: ВЫКЛ"}
      </button>
    </div>
  );
}
