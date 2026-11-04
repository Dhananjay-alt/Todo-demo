# TODO App

A simple command-line TODO application built with Node.js.

## Features

- Add, complete, and delete tasks
- List all tasks with status indicators
- Persistent storage via JSON file
- Filter tasks by status

## Usage

```bash
node src/index.js add "Buy groceries"
node src/index.js list
node src/index.js complete 1
node src/index.js delete 1
node src/index.js list --done
node src/index.js list --pending
```

## Testing

```bash
npm test
```


## Quick verification

From the repository directory, check Node.js and run the existing tests before trying the CLI:

```bash
node --version
npm test
node src/index.js list
```
