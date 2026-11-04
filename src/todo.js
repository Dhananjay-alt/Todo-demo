const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "todos.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

function loadTodos() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function saveTodos(todos) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

function addTodo(title) {
  const todos = loadTodos();
  const todo = {
    id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
    title,
    done: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  saveTodos(todos);
  return todo;
}

function listTodos(filter = "all") {
  const todos = loadTodos();
  if (filter === "done") return todos.filter((t) => t.done);
  if (filter === "pending") return todos.filter((t) => !t.done);
  return todos;
}

function completeTodo(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  todo.done = true;
  todo.completedAt = new Date().toISOString();
  saveTodos(todos);
  return todo;
}

function deleteTodo(id) {
  const todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const [removed] = todos.splice(index, 1);
  saveTodos(todos);
  return removed;
}

function clearTodos() {
  saveTodos([]);
}

module.exports = { addTodo, listTodos, completeTodo, deleteTodo, clearTodos };

