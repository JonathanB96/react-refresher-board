import { useEffect, useMemo, useRef, useState } from "react";

export default function TaskModal({ isOpen, task, onClose, onSave }) {
  const titleRef = useRef(null);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "medium");
  const [error, setError] = useState("");

  // When opening or switching tasks, sync local state
  useEffect(() => {
    if (!isOpen) return;
    setTitle(task?.title ?? "");
    setDescription(task?.description ?? "");
    setPriority(task?.priority ?? "medium");
    setError("");
  }, [isOpen, task]);

  // Auto-focus when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => titleRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [isOpen]);

  const canSave = useMemo(() => title.trim().length >= 2, [title]);

  function handleSave() {
    setError("");
    const cleanTitle = title.trim();
    if (cleanTitle.length < 2) {
      setError("Title must be at least 2 characters.");
      return;
    }

    onSave({
      ...task,
      title: cleanTitle,
      description: description.trim(),
      priority,
    });

    onClose();
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "enter") handleSave();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, title, description, priority, task]);

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Edit task</h2>
            <p className="text-xs text-slate-400">
              Esc to close • Ctrl/⌘ + Enter to save
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-300">Title</label>
            <input
              ref={titleRef}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
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

            <div>
              <label className="mb-1 block text-xs text-slate-300">Status</label>
              <input
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-400"
                value={task?.status ?? ""}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-300">Description</label>
            <textarea
              className="min-h-[110px] w-full resize-y rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <div className="mt-1 flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save changes
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
