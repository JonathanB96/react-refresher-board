import { useMemo, useState } from "react";

function makeId() {
  // modern browsers
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  // fallback
  return `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => title.trim().length >= 2, [title]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanTitle = title.trim();
    if (cleanTitle.length < 2) {
      setError("Title must be at least 2 characters.");
      return;
    }

    onAdd({
      id: makeId(),
      title: cleanTitle,
      description: description.trim(),
      priority,
      status: "todo",
    });

    // reset
    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-slate-300">Title</label>
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Finish Step 6 (forms)"
          />
        </div>

        <div className="sm:w-48">
          <label className="mb-1 block text-xs text-slate-300">Priority</label>
          <select
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-600"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Task
        </button>
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs text-slate-300">Description</label>
        <textarea
          className="min-h-[80px] w-full resize-y rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details…"
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}

      <p className="mt-2 text-xs text-slate-400">
        Tip: title must be at least 2 characters.
      </p>
    </form>
  );
}
