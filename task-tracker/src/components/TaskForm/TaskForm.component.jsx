import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskName.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:5000/tasks', {
        name: taskName,
      });
      addTask(response.data);
      setTaskName('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
