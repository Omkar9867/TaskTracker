const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// In-memory array to store tasks
let tasks = [];

// GET /tasks: Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks: Add a new task
app.post('/tasks', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Task name is required' });
  }

  const newTask = {
    id: Date.now().toString(),
    name,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id: Update the status of a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedStatus = req.body.completed;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex].completed = updatedStatus;
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id: Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter((task) => task.id !== taskId);
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
