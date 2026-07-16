import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  async function addTask(task) {
    try {
      await createTask(task);
      loadTasks();
    } catch {
      setError("Unable to create task.");
    }
  }

  async function toggleTask(task) {
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });

      loadTasks();
    } catch {
      setError("Unable to update task.");
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);
      loadTasks();
    } catch {
      setError("Unable to delete task.");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    removeTask,
  };
}