import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import useTasks from "../hooks/useTasks";

export default function TaskList() {
  const {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    removeTask,
  } = useTasks();

  return (
    <>
      <TaskForm onTaskCreated={addTask} />

      {loading && (
        <p className="status">Loading tasks...</p>
      )}

      {error && (
        <p className="status error">{error}</p>
      )}

      {!loading && !error && (
        <section className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-state">
              No tasks yet. Add your first task above.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={removeTask}
                onToggle={toggleTask}
              />
            ))
          )}
        </section>
      )}
    </>
  );
}