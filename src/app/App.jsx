import Board from "../components/Board";
const columns = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
];

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>React Refresher Board</h1>
      <Board columns={columns} />
    </div>
  );
}
