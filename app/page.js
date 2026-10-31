"use client";
import { useState } from "react";

import Link from "next/link";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [addedTasks, setAddedTasks] = useState(() => {
    const now = Date.now();
    const getDeadline = (daysFromToday) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromToday);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    return [
      {
        id: "sample-java-assignment",
        name: "Complete Java assignment",
        subject: "OOPs",
        priority: "High",
        deadline: getDeadline(0),
        completed: false,
        createdAt: now - 3 * 60 * 1000,
      },
      {
        id: "sample-operating-systems",
        name: "Study Operating Systems",
        subject: "OS",
        priority: "Medium",
        deadline: getDeadline(1),
        completed: false,
        createdAt: now - 2 * 60 * 1000,
      },
      {
        id: "sample-data-structures",
        name: "Practice Data Structures",
        subject: "DSA",
        priority: "Low",
        deadline: getDeadline(3),
        completed: false,
        createdAt: now - 1 * 60 * 1000,
      },
    ];
  });

  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const totalTasks = addedTasks.length;

  const completedTasks = addedTasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const filteredTasks = addedTasks.filter(
    (task) =>
      filterPriority === "All" ||
      task.priority === filterPriority
  );

  const visibleTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "Newest") return b.createdAt - a.createdAt;

    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;

    return a.deadline.localeCompare(b.deadline);
  });
  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-green-800">Dayahead</h2>

        <nav className="flex gap-6 text-gray-600">
          <Link href="/">Dashboard</Link>
          <Link href="/tasks">My Tasks</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <main className="min-h-screen bg-stone-50 p-8">
        <section className="py-10">
          <h1 className="text-3xl font-bold text-stone-800">
            Good morning!
          </h1>

          <p className="mt-2 text-stone-500">
            Plan your day, one task at a time.
          </p>
        </section>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Total Tasks</p>
            <h2 className="mt-2 text-3xl font-bold">{totalTasks}</h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">{completedTasks}</h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-amber-600">{pendingTasks}</h2>
          </div>
        </section>
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-stone-800">
              Today&apos;s Tasks
            </h2>

            <div className="mb-5 flex gap-3">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="rounded-lg border bg-white p-2"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-lg border bg-white p-2"
              >
                <option value="Newest">Newest First</option>
                <option value="Deadline">Deadline</option>
              </select>
            </div>

            {showForm && (
              <div className="mb-5 rounded-xl border border-stone-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold">
                  {editingTaskId !== null ? "Edit Task" : "Add a New Task"}
                </h3>

                <input
                  type="text"
                  placeholder="Enter task name"
                  className="mb-3 w-full rounded-lg border p-3"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mb-3 w-full rounded-lg border p-3"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>

                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mb-3 w-full rounded-lg border p-3"
                />

                <button
                  onClick={() => {
                    if (taskName.trim() === "") return;

                    if (editingTaskId !== null) {
                      setAddedTasks(
                        addedTasks.map((item) =>
                          item.id === editingTaskId
                            ? {
                              ...item,
                              name: taskName,
                              priority,
                              deadline,
                            }
                            : item
                        )
                      );
                    } else {
                      setAddedTasks([
                        ...addedTasks,
                        {
                          id: crypto.randomUUID(),
                          name: taskName,
                          priority,
                          deadline,
                          completed: false,
                          createdAt: Date.now(),
                        }
                      ]);
                    }

                    setTaskName("");
                    setPriority("Medium");
                    setDeadline("");
                    setEditingTaskId(null);
                    setShowForm(false);
                  }}
                  className="rounded-lg bg-green-800 px-4 py-2 text-white"
                >
                  Save Task
                </button>
              </div>
            )}

            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-green-800 px-4 py-2 text-white"
            >
              + Add Task
            </button>
          </div>
          {visibleTasks.map((task) => (
            <div
              key={task.id}
              className="mt-3 rounded-xl border border-stone-200 bg-white p-5"
            >
              <h3 className="font-semibold text-stone-800">
                {task.name}
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                {task.subject ? `${task.subject} · ` : ""}
                {task.deadline ? `Due: ${task.deadline}` : "No deadline"}
              </p>

              <p className="mt-1 text-sm font-medium">
                {task.priority} Priority
              </p>
              <button
                onClick={() => {
                  setAddedTasks(
                    addedTasks.map((item) =>
                      item.id === task.id
                        ? { ...item, completed: !item.completed }
                        : item
                    )
                  );
                }}
                className="mt-3 rounded-lg bg-green-100 px-3 py-2 text-sm text-green-800"
              >
                {task.completed ? "Completed ✓" : "Mark as Completed"}
              </button>

              <button
                onClick={() => {
                  setTaskName(task.name);
                  setPriority(task.priority);
                  setDeadline(task.deadline);
                  setEditingTaskId(task.id);
                  setShowForm(true);
                }}
                className="mt-3 rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700 ml-2"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setAddedTasks(
                    addedTasks.filter((item) => item.id !== task.id)
                  );
                }}
                className="ml-2 mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
