export default function SearchBar({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-slate-300">Search</label>
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-600"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title or description…"
          />
        </div>

        <div className="sm:w-56">
          <label className="mb-1 block text-xs text-slate-300">Priority</label>
          <select
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-600"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-400">
        Tip: search is debounced to reduce re-renders.
      </p>
    </div>
  );
}
