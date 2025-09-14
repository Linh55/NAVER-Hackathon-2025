
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  deadline: string;
  done: boolean;
  createdAt: string;
};

// Component riêng cho Start Page
function StartPage({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Your Todo App!</h1>
      <p>Manage your tasks efficiently and never miss a deadline!</p>
      <button
        style={{ 
          padding: "12px 24px", 
          fontSize: "18px", 
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginTop: "20px"
        }}
        onClick={onStart}
      >
        Get Started
      </button>
    </div>
  );
}

// Component riêng cho Todo Item
function TodoItem({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit 
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
      deadline: editDeadline
    });
    setIsEditing(false);
  };

  const isOverdue = new Date(todo.deadline) < new Date() && !todo.done;

  return (
    <li
      style={{
        padding: "12px",
        borderBottom: "1px solid #eee",
        margin: "8px auto",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: todo.done ? "#e8f5e9" : isOverdue ? "#ffebee" : "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        transition: "all 0.3s ease"
      }}
    >
      <div style={{ flex: 1 }}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          style={{ marginRight: "12px" }}
        />
        
        {isEditing ? (
          <>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ 
                padding: "6px", 
                fontSize: "14px", 
                marginBottom: "6px",
                width: "100%",
                maxWidth: "300px"
              }}
            />
            <br />
            <input
              type="datetime-local"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              style={{ 
                padding: "6px", 
                fontSize: "12px",
                width: "100%",
                maxWidth: "300px"
              }}
            />
          </>
        ) : (
          <>
            <strong style={{ textDecoration: todo.done ? "line-through" : "none" }}>
              {todo.text}
            </strong>
            <br />
            <small>
              Deadline: {new Date(todo.deadline).toLocaleString()}
              {isOverdue && " (Overdue)"}
            </small>
            <br />
            <small style={{ color: "#666" }}>
              Created: {new Date(todo.createdAt).toLocaleString()}
            </small>
          </>
        )}
      </div>
      
      <div style={{ display: "flex", gap: "8px" }}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{
                padding: "6px 12px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "6px 12px",
                background: "#9e9e9e",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "6px 12px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this task?")) {
                  onDelete(todo.id);
                }
              }}
              style={{
                padding: "6px 12px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
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
  const [sortBy, setSortBy] = useState<"deadline" | "created" | "text">("deadline");

  // Load todos từ localStorage khi component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Lưu todos vào localStorage mỗi khi todos thay đổi
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "" || deadline.trim() === "") return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      deadline,
      done: false,
      createdAt: new Date().toISOString()
    };
    
    setTodos([...todos, newTodo]);
    setInput("");
    setDeadline("");
  };

  const toggleDone = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  // Lọc và sắp xếp todos
  const filteredAndSortedTodos = todos
    .filter(todo => {
      if (filter === "active") return !todo.done;
      if (filter === "completed") return todo.done;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortBy === "created") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return a.text.localeCompare(b.text);
      }
    });

  if (page === "start") {
    return <StartPage onStart={() => setPage("todo")} />;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>ToDo List</h1>
        <button
          onClick={() => setPage("start")}
          style={{
            padding: "8px 16px",
            background: "#9e9e9e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Back to Home
        </button>
      </div>

      {/* Form thêm công việc mới */}
      <div style={{ 
        padding: "16px", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "4px",
        marginBottom: "20px"
      }}>
        <h3>Add New Task</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
            style={{ 
              padding: "10px", 
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Deadline:</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{ 
                padding: "8px", 
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                flex: 1
              }}
            />
          </div>
          <button
            onClick={addTodo}
            style={{ 
              padding: "10px 16px", 
              fontSize: "16px", 
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px"
            }}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Bộ lọc và sắp xếp */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginBottom: "16px",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <div>
          <span style={{ marginRight: "8px", fontWeight: "bold" }}>Filter:</span>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            style={{ padding: "6px", borderRadius: "4px" }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <span style={{ marginRight: "8px", fontWeight: "bold" }}>Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ padding: "6px", borderRadius: "4px" }}
          >
            <option value="deadline">Deadline</option>
            <option value="created">Recently Added</option>
            <option value="text">Text</option>
          </select>
        </div>
        
        <button
          onClick={clearCompleted}
          style={{
            padding: "6px 12px",
            background: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Clear Completed
        </button>
      </div>

      {/* Thống kê */}
      <div style={{ marginBottom: "16px", color: "#666" }}>
        <strong>
          {todos.filter(t => !t.done).length} active / {todos.length} total tasks
        </strong>
      </div>

      {/* Danh sách công việc */}
      <ul style={{ listStyle: "none", padding: 0 }}>
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
          <li style={{ 
            textAlign: "center", 
            padding: "20px", 
            color: "#666",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px"
          }}>
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
