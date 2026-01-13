import { useEffect, useMemo, useReducer } from "react";

import Board from "../components/Board";
import TaskModal from "../components/TaskModal";
import AddTaskForm from "../components/AddTaskForm";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";

import { useDebounce } from "../hooks/useDebounce";
import { boardReducer, initialState } from "../lib/boardReducer";

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
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // init tasks once (simulates fetching)
  useEffect(() => {
    dispatch({ type: "TASKS_INIT", payload: initialTasks });
  }, []);

  const { tasks, ui } = state;

  const debouncedSearch = useDebounce(ui.search, 250);

  const filteredTasks = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();

    return tasks.filter((t) => {
      const matchesPriority =
        ui.priorityFilter === "all" ? true : t.priority === ui.priorityFilter;

      const matchesSearch =
        q.length === 0
          ? true
          : (t.title + " " + (t.description ?? ""))
              .toLowerCase()
              .includes(q);

      return matchesPriority && matchesSearch;
    });
  }, [tasks, debouncedSearch, ui.priorityFilter]);

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

  const editingTask = useMemo(() => {
    return tasks.find((t) => t.id === ui.editingTaskId) ?? null;
  }, [tasks, ui.editingTaskId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center">
      <div className="w-full max-w-6xl p-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              React Refresher Board
            </h1>
            <p className="text-sm text-slate-300">
              Step 9: useReducer architecture ✅
            </p>
          </div>

          <div className="text-sm text-slate-300">
            Tasks:{" "}
            <span className="font-semibold text-slate-100">{tasks.length}</span>
          </div>
        </header>

        <main className="mt-6 space-y-4">
          <Stats {...stats} />

          <SearchBar
            search={ui.search}
            onSearchChange={(v) => dispatch({ type: "UI_SET_SEARCH", payload: v })}
            priority={ui.priorityFilter}
            onPriorityChange={(v) =>
              dispatch({ type: "UI_SET_PRIORITY", payload: v })
            }
          />

          <AddTaskForm
            onAdd={(task) => dispatch({ type: "TASK_ADD", payload: task })}
          />

          <Board
            columns={columns}
            tasks={filteredTasks}
            onMoveTask={(id, status) =>
              dispatch({ type: "TASK_MOVE", payload: { id, status } })
            }
            onDeleteTask={(id) =>
              dispatch({ type: "TASK_DELETE", payload: id })
            }
            onEditTask={(task) =>
              dispatch({ type: "UI_OPEN_EDIT", payload: task.id })
            }
          />

          <TaskModal
            isOpen={ui.isModalOpen}
            task={editingTask}
            onClose={() => dispatch({ type: "UI_CLOSE_MODAL" })}
            onSave={(updated) =>
              dispatch({ type: "TASK_UPDATE", payload: updated })
            }
          />
        </main>
      </div>
    </div>
  );
}
