function Pill({ children }) {
  return (
    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-200">
      {children}
    </span>
  );
}

const priorityBadge = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function TaskCard({ task, onMove, onDelete }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{task.title}</h3>
          {task.description ? (
            <p className="mt-1 text-sm text-slate-300">{task.description}</p>
          ) : null}
        </div>

        <Pill>{priorityBadge[task.priority] ?? task.priority}</Pill>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.status !== "todo" && (
          <button
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs hover:bg-slate-800"
            onClick={() => onMove(task.id, "todo")}
          >
            Move to Todo
          </button>
        )}
        {task.status !== "doing" && (
          <button
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs hover:bg-slate-800"
            onClick={() => onMove(task.id, "doing")}
          >
            Move to Doing
          </button>
        )}
        {task.status !== "done" && (
          <button
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs hover:bg-slate-800"
            onClick={() => onMove(task.id, "done")}
          >
            Move to Done
          </button>
        )}

        <button
          className="ml-auto rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-1.5 text-xs text-red-200 hover:bg-red-950/70"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
