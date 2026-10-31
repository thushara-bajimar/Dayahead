"use client";

import { useState } from "react";

export default function TaskForm({ initialTask, onSave }) {
  const [taskName, setTaskName] = useState(initialTask?.name || "");
  const [priority, setPriority] = useState(initialTask?.priority || "Medium");
  const [deadline, setDeadline] = useState(initialTask?.deadline || "");

  function handleSubmit(event) {
    event.preventDefault();

    if (!taskName.trim()) return;

    onSave({
      name: taskName.trim(),
      priority,
      deadline,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 rounded-xl border border-stone-200 bg-white p-5"
    >
      <h3 className="mb-4 text-lg font-semibold">
        {initialTask ? "Edit Task" : "Add a New Task"}
      </h3>

      <input
        type="text"
        placeholder="Enter task name"
        className="mb-3 w-full rounded-lg border p-3"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        required
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        className="mb-3 w-full rounded-lg border p-3"
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <input
        type="date"
        value={deadline}
        onChange={(event) => setDeadline(event.target.value)}
        className="mb-3 w-full rounded-lg border p-3"
      />

      <button
        type="submit"
        className="rounded-lg bg-green-800 px-4 py-2 text-white"
      >
        Save Task
      </button>
    </form>
  );
}
