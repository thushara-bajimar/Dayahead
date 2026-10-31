export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="mt-3 rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="font-semibold text-stone-800">{task.name}</h3>
      <p className="mt-1 text-sm text-stone-500">
        {task.subject ? `${task.subject} · ` : ""}
        {task.deadline ? `Due: ${task.deadline}` : "No deadline"}
      </p>

      <p className="mt-1 text-sm font-medium">{task.priority} Priority</p>

      <button
        type="button"
        onClick={() => onToggleComplete(task.id)}
        className="mt-3 rounded-lg bg-green-100 px-3 py-2 text-sm text-green-800"
      >
        {task.completed ? "Completed ✓" : "Mark as Completed"}
      </button>

      <button
        type="button"
        onClick={() => onEdit(task)}
        className="mt-3 ml-2 rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="ml-2 mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
