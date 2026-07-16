import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main className="container">
      <h1>TaskFlow</h1>

      <TaskList />
    </main>
  );
}