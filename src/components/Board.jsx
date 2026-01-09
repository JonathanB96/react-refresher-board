import Column from "./Column";

export default function Board({ columns }) {
  return (
    <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
      {columns.map((col) => (
        <Column key={col.id} title={col.title} />
      ))}
    </div>
  );
}
