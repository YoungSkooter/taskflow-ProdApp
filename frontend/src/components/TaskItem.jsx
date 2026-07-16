export default function TaskItem({
  task,
  onDelete,
  onToggle,
}) {
  return (
    <div className="task-card">

      <div className="task-info">

        <h3>{task.title}</h3>

        <p>{task.description}</p>

        <small>
          {task.completed
            ? "✅ Completed"
            : "⏳ Pending"}
        </small>

      </div>

      <div className="task-actions">

        <button
          onClick={() => onToggle(task)}
        >
          {task.completed
            ? "Undo"
            : "Complete"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}