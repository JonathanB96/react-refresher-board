export default function Stats({ total, todo, doing, done, shown }) {
  const items = [
    ["Total", total],
    ["Shown", shown],
    ["Todo", todo],
    ["Doing", doing],
    ["Done", done],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
        >
          <div className="text-xs text-slate-400">{label}</div>
          <div className="mt-1 text-2xl font-bold">{value}</div>
        </div>
      ))}
    </div>
  );
}
