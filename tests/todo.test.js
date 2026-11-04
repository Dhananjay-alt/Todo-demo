const { addTodo, listTodos, completeTodo, deleteTodo, clearTodos } = require("../src/todo");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✔ ${message}`);
    passed++;
  } else {
    console.log(`  ✘ ${message}`);
    failed++;
  }
}

console.log("\nRunning TODO tests...\n");

// Setup
clearTodos();

// Test: Add a todo
const todo1 = addTodo("Buy groceries");
assert(todo1.id === 1, "First todo should have id 1");
assert(todo1.title === "Buy groceries", "Title should match");
assert(todo1.done === false, "New todo should not be done");

// Test: Add another todo
const todo2 = addTodo("Walk the dog");
assert(todo2.id === 2, "Second todo should have id 2");

// Test: List all todos
const all = listTodos();
assert(all.length === 2, "Should have 2 todos");

// Test: Complete a todo
const completed = completeTodo(1);
assert(completed.done === true, "Todo should be marked done");
assert(completed.completedAt !== undefined, "Should have completedAt timestamp");

// Test: Filter done
const doneList = listTodos("done");
assert(doneList.length === 1, "Should have 1 done todo");

// Test: Filter pending
const pendingList = listTodos("pending");
assert(pendingList.length === 1, "Should have 1 pending todo");

// Test: Delete a todo
const deleted = deleteTodo(2);
assert(deleted.title === "Walk the dog", "Deleted todo title should match");
assert(listTodos().length === 1, "Should have 1 todo after deletion");

// Test: Delete non-existent
const notFound = deleteTodo(999);
assert(notFound === null, "Deleting non-existent todo should return null");

// Cleanup
clearTodos();

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);

