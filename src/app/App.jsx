import { useState } from "react";
import Board from "../components/Board";

import AddTaskForm from "../components/AddTaskForm";


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
  const [tasks, setTasks] = useState(initialTasks);

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
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl p-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              React Refresher Board
            </h1>
            <p className="text-sm text-slate-300">
              Step 5: Tailwind UI makeover ✅
            </p>
          </div>

          <div className="text-sm text-slate-300">
            Tasks: <span className="font-semibold text-slate-100">{tasks.length}</span>
          </div>
        </header>

        <main className="mt-6">
          <main className="mt-6 space-y-4">
          <AddTaskForm onAdd={addTask} />
          <Board
            columns={columns}
            tasks={tasks}
            onMoveTask={moveTask}
            onDeleteTask={deleteTask}
          />
</main>

          <Board
            columns={columns}
            tasks={tasks}
            onMoveTask={moveTask}
            onDeleteTask={deleteTask}
          />
        </main>
      </div>
    </div>
  );
}
