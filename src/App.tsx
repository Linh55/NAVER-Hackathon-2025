import  { useState } from "react";
import "./App.css";

type Task = {
  id: number;
  text: string;
  deadline: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("deadline");

  // Thêm task
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

  // Toggle trạng thái done
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Xóa task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Lọc task
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // Sắp xếp
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
    return a.text.localeCompare(b.text);
  });

  return (
    <div className="app-container">
      {/* Form thêm task */}
      <div className="add-task-section">
        <h2>Add New Task</h2>

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

      {/* Filter & Sort */}
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

      {/* Danh sách task */}
      <ul className="todo-list">
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`todo-item ${task.completed ? "done" : ""}`}
          >
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
  );
}

export default App;
