import { useMemo, useState } from "react";

import Board from "../components/Board";
import TaskModal from "../components/TaskModal";
import AddTaskForm from "../components/AddTaskForm";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";

import { useDebounce } from "../hooks/useDebounce";

const columns = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
];

const initialTasks = [
  {
    id: "t1",
    title: "Set up board UI",
    description: "Columns done ✅",
    status: "done",
    priority: "low",
  },
  {
    id: "t2",
    title: "Render tasks per column",
    description: "Use lists + keys",
    status: "doing",
    priority: "high",
  },
  {
    id: "t3",
    title: "Add task form",
    description: "Controlled inputs next",
    status: "todo",
    priority: "medium",
  },
];

export default function App() {
  /* ---------------- state ---------------- */
  const [tasks, setTasks] = useState(initialTasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const debouncedSearch = useDebounce(search, 250);

  /* ---------------- actions ---------------- */
  function moveTask(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  function addTask(newTask) {
    setTasks((prev) => [newTask, ...prev]);
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (editingTask?.id === taskId) {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  }

  function openEdit(task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function closeEdit() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function saveTask(updatedTask) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  /* ---------------- derived data ---------------- */
  const filteredTasks = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();

    return tasks.filter((t) => {
      const matchesPriority =
        priorityFilter === "all" ? true : t.priority === priorityFilter;

      const matchesSearch =
        q.length === 0
          ? true
          : (t.title + " " + (t.description ?? ""))
              .toLowerCase()
              .includes(q);

      return matchesPriority && matchesSearch;
    });
  }, [tasks, debouncedSearch, priorityFilter]);

  const stats = useMemo(() => {
    const counts = { todo: 0, doing: 0, done: 0 };
    for (const t of tasks) counts[t.status]++;

    return {
      total: tasks.length,
      shown: filteredTasks.length,
      todo: counts.todo,
      doing: counts.doing,
      done: counts.done,
    };
  }, [tasks, filteredTasks.length]);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl p-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              React Refresher Board
            </h1>
            <p className="text-sm text-slate-300">
              Add • Edit • Search • Filter • Memo • Debounce
            </p>
          </div>

          <div className="text-sm text-slate-300">
            Tasks:{" "}
            <span className="font-semibold text-slate-100">
              {tasks.length}
            </span>
          </div>
        </header>

        <main className="mt-6 space-y-4">
          <Stats {...stats} />

          <SearchBar
            search={search}
            onSearchChange={setSearch}
            priority={priorityFilter}
            onPriorityChange={setPriorityFilter}
          />

          <AddTaskForm onAdd={addTask} />

          <Board
            columns={columns}
            tasks={filteredTasks}
            onMoveTask={moveTask}
            onDeleteTask={deleteTask}
            onEditTask={openEdit}
          />

          <TaskModal
            isOpen={isModalOpen}
            task={editingTask}
            onClose={closeEdit}
            onSave={saveTask}
          />
        </main>
      </div>
    </div>
  );
}
