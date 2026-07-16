import api from "../api/api";

export async function getTasks() {
  const res = await api.get("/tasks");
  return res.data;
}

export async function createTask(task) {
  const res = await api.post("/tasks", task);
  return res.data;
}

export async function updateTask(id, task) {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}