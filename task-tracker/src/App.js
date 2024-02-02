// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList/Tasklist.component';
import TaskForm from './components/TaskForm/TaskForm.component';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (taskName) => {
    const newTask = {
      id: new Date().getTime(),
      name: taskName,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>
      <TaskList tasks={tasks} toggleTask={toggleTask} />
      <TaskForm addTask={addTask} />
    </div>
  );
} 

export default App;
