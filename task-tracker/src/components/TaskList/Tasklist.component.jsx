// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const toggleTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`);
      // Update tasks after toggling
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.name}
          </span>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
