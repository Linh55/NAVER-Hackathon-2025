import { useState, useEffect } from "react";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  deadline: string;
  done: boolean;
  createdAt: string;
};

// Component Welcome Page
function StartPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="container" id="welcome-page">
      <h1>Welcome to Your Todo App!</h1>
      <p>Manage your tasks efficiently and never miss a deadline!</p>
      <button className="get-started-btn" onClick={onStart}>
        Get Started
      </button>
    </div>
  );
}

// Component Todo Item
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

  const isOverdue = new Date(todo.deadline) < new Date() && !todo.done;

  return (
    <li
      className={`todo-item ${todo.done ? "done" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />

        {isEditing ? (
          <div className="edit-form">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              placeholder="Task description"
            />
            <input
              type="datetime-local"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              className="edit-deadline"
            />
          </div>
        ) : (
          <div className="todo-info">
            <span className={`todo-text ${todo.done ? "completed" : ""}`}>
              {todo.text}
            </span>
            <div className="todo-dates">
              <span className="deadline">
                Deadline: {new Date(todo.deadline).toLocaleString()}
                {isOverdue && (
                  <span className="overdue-label"> (Overdue)</span>
                )}
              </span>
              <span className="created">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn btn-save">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  onDelete(todo.id);
                }
              }}
              className="btn btn-delete"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

// Component chính
function App() {
  const [page, setPage] = useState<"start" | "todo">("start");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"deadline" | "created" | "text">(
    "deadline"
  );

  // Load từ localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "" || deadline.trim() === "") {
      alert("Please enter both task description and deadline!");
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

  const toggleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const clearCompleted = () => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      setTodos(todos.filter((todo) => !todo.done));
    }
  };

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.done;
      if (filter === "completed") return todo.done;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return (
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
      } else if (sortBy === "created") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return a.text.localeCompare(b.text);
      }
    });

  if (page === "start") {
    return <StartPage onStart={() => setPage("todo")} />;
  }

  return (
    <div id="todo-page">
      <div className="todo-header">
        <h1>My Todo List</h1>
        <button onClick={() => setPage("start")} className="back-btn">
          Back
        </button>
      </div>

      {/* Form thêm task */}
      <div className="add-todo-form">
        <h3>Add New Task</h3>
        <div className="form-inputs">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task description..."
            className="task-input"
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <div className="deadline-input-container">
            <label className="deadline-label">Deadline:</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="deadline-input"
            />
          </div>
          <button onClick={addTodo} className="btn btn-add">
            Add Task
          </button>
        </div>
      </div>

      {/* Bộ lọc & sort */}
      <div className="controls-container">
        <div className="filter-control">
          <span className="control-label">Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="control-select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="sort-control">
          <span className="control-label">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="control-select"
          >
            <option value="deadline">Deadline</option>
            <option value="created">Recently Added</option>
            <option value="text">Text</option>
          </select>
        </div>

        <button onClick={clearCompleted} className="btn btn-clear">
          Clear Completed
        </button>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <strong>
          {todos.filter((t) => !t.done).length} active / {todos.length} total
          tasks
        </strong>
        {todos.filter((t) => !t.done && new Date(t.deadline) < new Date())
          .length > 0 && (
          <span className="overdue-stats">
            {" "}
            (
            {
              todos.filter(
                (t) => !t.done && new Date(t.deadline) < new Date()
              ).length
            }{" "}
            overdue)
          </span>
        )}
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredAndSortedTodos.length > 0 ? (
          filteredAndSortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleDone}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        ) : (
          <li className="empty-state">
            {filter === "completed"
              ? "No completed tasks yet."
              : filter === "active"
              ? "No active tasks. Great job!"
              : "No tasks yet. Add a new task to get started!"}
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
