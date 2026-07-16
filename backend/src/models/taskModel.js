import pool from "../db/index.js";

export async function getAllTasks() {
  const result = await pool.query(
    "SELECT * FROM tasks ORDER BY id DESC"
  );

  return result.rows;
}

export async function getTaskById(id) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

export async function createTask(title, description) {
  const result = await pool.query(
    `
    INSERT INTO tasks(title, description)
    VALUES($1, $2)
    RETURNING *
    `,
    [title, description]
  );

  return result.rows[0];
}

export async function updateTask(id, completed) {
  const result = await pool.query(
    `
    UPDATE tasks
    SET completed = $1
    WHERE id = $2
    RETURNING *
    `,
    [completed, id]
  );

  return result.rows[0];
}

export async function deleteTask(id) {
  await pool.query(
    "DELETE FROM tasks WHERE id = $1",
    [id]
  );
}