import Column from "./Column";

export default function Board({ columns, tasks, onMoveTask, onDeleteTask, onEditTask }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {columns.map((col) => {
        const tasksInColumn = tasks.filter((t) => t.status === col.id);

        return (
          <Column
            key={col.id}
            title={col.title}
            count={tasksInColumn.length}
            tasks={tasksInColumn}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        );
      })}
    </div>
  );
}
