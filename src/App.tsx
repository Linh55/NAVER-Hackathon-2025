import { useState, useEffect } from "react";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  deadline: string;
  done: boolean;
  createdAt: string;
};

// Start Page
function StartPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="container">
      <h1>Welcome to Your Todo App!</h1>
      <p>Manage your tasks efficiently and never miss a deadline!</p>
      <button onClick={onStart}>Get Started</button>
    </div>
  );
}

// Todo Item
function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline);

  const handleSave = () => {
    onEdit({
      ...todo,
      text: editText,
      deadline: editDeadline,
    });
    setIsEditing(false);
  };

  return (
    <li className={todo.done ? "done" : "pending"}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />

        {isEditing ? (
          <div className="edit-form">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Task description"
            />
            <input
              type="datetime-local"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
            />
          </div>
        ) : (
          <div className="todo-info">
            <span>{todo.text}</span>
            <small>
              Deadline: {new Date(todo.deadline).toLocaleString()} | Created:{" "}
              {new Date(todo.createdAt).toLocaleString()}
            </small>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}

// Main App
function App() {
  const [page, setPage] = useState<"start" | "todo">("start");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"deadline" | "created" | "text">(
    "deadline"
  );

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim() || !deadline.trim()) {
      alert("Please enter both task and deadline!");
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      deadline,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
    setInput("");
    setDeadline("");
  };

  const toggleDone = (id: number) =>
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const deleteTodo = (id: number) =>
    setTodos(todos.filter((t) => t.id !== id));

  const editTodo = (updated: Todo) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));

  const filteredTodos = todos
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "completed") return t.done;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "deadline")
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === "created")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return a.text.localeCompare(b.text);
    });

  if (page === "start") return <StartPage onStart={() => setPage("todo")} />;

  return (
    <div className="container">
      <h1>My Todo List</h1>
      <button onClick={() => setPage("start")}>Back</button>

      <div className="todo-form">
        <h2>Add New Task</h2>
        <label>Task:</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <label>Deadline:</label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>

      <div className="controls">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
          <option value="deadline">Deadline</option>
          <option value="created">Recently Added</option>
          <option value="text">Text</option>
        </select>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleDone}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
