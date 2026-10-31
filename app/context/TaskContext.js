"use client";

import { createContext, useContext, useState } from "react";

const TaskContext = createContext(null);

function createSampleTasks() {
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
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(createSampleTasks);

  function addTask(taskDetails) {
    const newTask = {
      ...taskDetails,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function editTask(taskId, updatedDetails) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedDetails } : task
      )
    );
  }

  function toggleTaskCompleted(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  const contextValue = {
    tasks,
    addTask,
    editTask,
    toggleTaskCompleted,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (context === null) {
    throw new Error("useTasks must be used inside a TaskProvider");
  }

  return context;
}
