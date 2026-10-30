"use client";
import { useState } from "react";

import Link from "next/link";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [addedTasks, setAddedTasks] = useState([]);

  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const totalTasks = addedTasks.length;

const completedTasks = addedTasks.filter(
  (task) => task.completed
).length;

const pendingTasks = totalTasks - completedTasks;
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
              Today's Tasks
            </h2>

            {showForm && (
              <div className="mb-5 rounded-xl border border-stone-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold">
                  Add a New Task
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

                    setAddedTasks([
                      ...addedTasks,
                      {
                        name: taskName,
                        priority: priority,
                        deadline: deadline,
                        completed: false
                      }
                    ]);
                    setTaskName("");
                    setPriority("Medium");
                    setDeadline("");
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
          <div className="rounded-xl border border-stone-200 bg-white p-5 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-stone-800">
                  Complete Java assignment
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  OOPs · Due today
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                High
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-stone-800">
                  Study Operating Systems
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  OS · Due tomorrow
                </p>
              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                Medium
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-stone-800">
                  Practice Data Structures
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  DSA · Due in 3 days
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Low
              </span>
            </div>
          </div>

          {addedTasks.map((task, index) => (
            <div
              key={index}
              className="mt-3 rounded-xl border border-stone-200 bg-white p-5"
            >
              <h3 className="font-semibold text-stone-800">
                {task.name}
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                {task.deadline ? `Due: ${task.deadline}` : "No deadline"}
              </p>

              <p className="mt-1 text-sm font-medium">
                {task.priority} Priority
              </p>
              <button
                onClick={() => {
                  setAddedTasks(
                    addedTasks.map((item, i) =>
                      i === index
                        ? { ...item, completed: !item.completed }
                        : item
                    )
                  );
                }}
                className="mt-3 rounded-lg bg-green-100 px-3 py-2 text-sm text-green-800"
              >
                {task.completed ? "Completed ✓" : "Mark as Completed"}
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
