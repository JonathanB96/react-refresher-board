export default function Column({ title }) {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 12,
        minHeight: 300,
      }}
    >
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p style={{ opacity: 0.7 }}>Tasks will go here…</p>
    </div>
  );
}
