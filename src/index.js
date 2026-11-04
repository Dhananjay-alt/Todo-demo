const { addTodo, listTodos, completeTodo, deleteTodo } = require("./todo");

const [, , command, ...args] = process.argv;

function formatTodo(todo) {
  const status = todo.done ? "✔" : "○";
  return `  ${status} [${todo.id}] ${todo.title}`;
}

switch (command) {
  case "add": {
    const title = args.join(" ");
    if (!title) {
      console.log("Usage: node src/index.js add <title>");
      process.exit(1);
    }
    const todo = addTodo(title);
    console.log(`Added: "${todo.title}" (id: ${todo.id})`);
    break;
  }

  case "list": {
    const filter = args[0]?.replace("--", "") || "all";
    const todos = listTodos(filter);
    if (todos.length === 0) {
      console.log("No tasks found.");
    } else {
      console.log(`\n  TODO List (${filter}):\n`);
      todos.forEach((t) => console.log(formatTodo(t)));
      console.log();
    }
    break;
  }

  case "complete": {
    const id = parseInt(args[0], 10);
    if (isNaN(id)) {
      console.log("Usage: node src/index.js complete <id>");
      process.exit(1);
    }
    const todo = completeTodo(id);
    if (todo) {
      console.log(`Completed: "${todo.title}"`);
    } else {
      console.log(`Task with id ${id} not found.`);
    }
    break;
  }

  case "delete": {
    const id = parseInt(args[0], 10);
    if (isNaN(id)) {
      console.log("Usage: node src/index.js delete <id>");
      process.exit(1);
    }
    const todo = deleteTodo(id);
    if (todo) {
      console.log(`Deleted: "${todo.title}"`);
    } else {
      console.log(`Task with id ${id} not found.`);
    }
    break;
  }

  default:
    console.log("Commands: add, list, complete, delete");
    break;
}

