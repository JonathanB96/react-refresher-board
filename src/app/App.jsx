import AppShell from "../app/AppShell";
import { BoardProvider } from "../context/BoardProvider";

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
  return (
    <BoardProvider initialTasks={initialTasks}>
      <AppShell />
    </BoardProvider>
  );
}
