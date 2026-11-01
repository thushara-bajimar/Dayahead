"use client";
import { useState } from "react";

import Link from "next/link";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import SummaryCard from "./components/SummaryCard";
import { useTasks } from "./context/TaskContext";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const { tasks, addTask, editTask, toggleTaskCompleted, deleteTask } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;
  const editingTask = tasks.find((task) => task.id === editingTaskId) || null;

  const filteredTasks = tasks.filter(
    (task) =>
      filterPriority === "All" ||
      task.priority === filterPriority
  );

  const today = new Date();
  const todayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const todayTasks = filteredTasks.filter(
    (task) =>
      task.deadline &&
      (task.deadline === todayDate || (!task.completed && task.deadline < todayDate))
  );

  const visibleTasks = [...todayTasks].sort((a, b) => {
    if (sortOrder === "Newest") return b.createdAt - a.createdAt;

    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;

    return a.deadline.localeCompare(b.deadline);
  });

  const upcomingTasks = tasks
    .filter((task) => !task.completed && task.deadline && task.deadline > todayDate)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-4">
        <h2 className="text-xl font-bold text-green-800">Dayahead</h2>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
          <Link href="/">Dashboard</Link>
          <Link href="/tasks">My Tasks</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </nav>
      </header>
      <main className="min-h-screen bg-stone-50 p-4 sm:p-8">
        <section className="py-10">
          <h1 className="text-3xl font-bold text-stone-800">
            Good morning!
          </h1>

          <p className="mt-2 text-stone-500">
            Plan your day, one task at a time.
          </p>
        </section>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard title="Total Tasks" value={totalTasks} />
          <SummaryCard
            title="Completed"
            value={completedTasks}
            valueClassName="text-green-700"
          />
          <SummaryCard
            title="Pending"
            value={pendingTasks}
            valueClassName="text-amber-600"
          />
        </section>
        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-stone-800">
              Today&apos;s Tasks
            </h2>

            <div className="flex flex-wrap gap-3">
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
              <TaskForm
                key={editingTaskId || "new-task"}
                initialTask={editingTask}
                onSave={(taskDetails) => {
                  if (editingTaskId !== null) {
                    editTask(editingTaskId, taskDetails);
                  } else {
                    addTask(taskDetails);
                  }

                  setEditingTaskId(null);
                  setShowForm(false);
                }}
              />
            )}

            <button
              onClick={() => {
                setEditingTaskId(null);
                setShowForm(true);
              }}
              className="rounded-lg bg-green-800 px-4 py-2 text-white"
            >
              + Add Task
            </button>
          </div>
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskCompleted}
              onEdit={(selectedTask) => {
                setEditingTaskId(selectedTask.id);
                setShowForm(true);
              }}
              onDelete={deleteTask}
            />
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-stone-800">Upcoming Tasks</h2>
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <TaskCard
                key={`upcoming-${task.id}`}
                task={task}
                onToggleComplete={toggleTaskCompleted}
                onEdit={(selectedTask) => {
                  setEditingTaskId(selectedTask.id);
                  setShowForm(true);
                }}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <p className="mt-3 rounded-xl border border-stone-200 bg-white p-5 text-stone-500">
              You&apos;re all caught up — no upcoming tasks yet.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
