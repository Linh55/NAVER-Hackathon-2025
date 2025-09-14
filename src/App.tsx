import { useState } from "react";
import "./App.css";

type Task = {
  id: number;
  text: string;
  deadline: string;
  completed: boolean;
};

function App() {
  const [page, setPage] = useState<"welcome" | "todo">("welcome");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("deadline");

  const addTask = () => {
    if (!input.trim() || !deadline) return;
    const newTask: Task = {
      id: Date.now(),
      text: input,
      deadline,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
    setDeadline("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
    return a.text.localeCompare(b.text);
  });

  return (
    <div className="app-container">
      {page === "welcome" ? (
        <div className="welcome">
          <h1>Welcome to Your Todo App!</h1>
          <p>Manage your tasks efficiently and never miss a deadline!</p>
          <button className="btn-start" onClick={() => setPage("todo")}>
            Get Started
          </button>
        </div>
      ) : (
        <div className="todo-page">
          <div className="todo-header">
            <h2>My Todo List</h2>
            <button className="btn-back" onClick={() => setPage("welcome")}>
              Back
            </button>
          </div>

          <div className="add-task-section">
            <h3>Add New Task</h3>
            <div className="task-input">
              <label>Task:</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter task description..."
              />
            </div>
            <div className="task-input">
              <label>Deadline:</label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="add-task-btn">
              <button className="btn-add" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>

          <div className="filter-sort">
            <div>
              <label>Filter: </label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label>Sort by: </label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="deadline">Deadline</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <ul className="todo-list">
            {sortedTasks.map((task) => (
              <li key={task.id} className={`todo-item ${task.completed ? "done" : ""}`}>
                <span className="todo-text" onClick={() => toggleTask(task.id)}>
                  {task.text} <br />
                  <small>Deadline: {task.deadline}</small>
                </span>
                <div>
                  <button className="btn btn-edit">Edit</button>
                  <button className="btn btn-delete" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
