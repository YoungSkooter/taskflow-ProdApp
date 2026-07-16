import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../models/taskModel.js";

export async function getTasks(req, res) {
  try {
    const tasks = await getAllTasks();

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTask(req, res) {
  try {
    const task = await getTaskById(req.params.id);

    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addTask(req, res) {
  try {
    const { title, description } = req.body;

    const task = await createTask(title, description);

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function completeTask(req, res) {
  try {
    const { completed } = req.body;

    const task = await updateTask(
      req.params.id,
      completed
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeTask(req, res) {
  try {
    await deleteTask(req.params.id);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}