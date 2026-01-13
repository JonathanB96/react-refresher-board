import TaskCard from "./TaskCard";

export default function Column({ title, count, tasks, onMoveTask, onDeleteTask }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-200">
          {count}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-slate-400">No tasks yet…</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMoveTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}
