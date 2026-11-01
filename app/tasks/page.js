"use client";

import { useState } from "react";
import Link from "next/link";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TaskContext";

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export default function TasksPage() {
  const { tasks, addTask, editTask, toggleTaskCompleted, deleteTask } = useTasks();
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const editingTask = tasks.find((task) => task.id === editingTaskId) || null;

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && !task.completed) ||
      (statusFilter === "Completed" && task.completed);
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  const visibleTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "Newest") return b.createdAt - a.createdAt;

    if (sortOrder === "Priority") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;

    return a.deadline.localeCompare(b.deadline);
  });

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
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
          <h1 className="text-3xl font-bold text-stone-800">My Tasks</h1>
          <p className="mt-2 text-stone-500">
            View and organize all your tasks.
          </p>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <select
                aria-label="Filter tasks by status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="min-h-11 rounded-lg border bg-white p-2"
              >
                <option value="All">All Tasks</option>
                <option value="Active">Active Tasks</option>
                <option value="Completed">Completed Tasks</option>
              </select>

              <select
                aria-label="Filter tasks by priority"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
                className="min-h-11 rounded-lg border bg-white p-2"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <select
                aria-label="Sort tasks"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="min-h-11 rounded-lg border bg-white p-2"
              >
                <option value="Newest">Newest First</option>
                <option value="Deadline">Deadline</option>
                <option value="Priority">Priority</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingTaskId(null);
                setShowForm(true);
              }}
              className="min-h-11 w-full rounded-lg bg-green-800 px-4 py-2 text-white sm:w-auto"
            >
              + Add Task
            </button>
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

          {visibleTasks.length > 0 ? (
            visibleTasks.map((task) => (
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
            ))
          ) : (
            <p className="rounded-xl border border-stone-200 bg-white p-5 text-stone-500">
              No tasks match these filters.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
