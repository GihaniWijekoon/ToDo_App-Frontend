import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Dashboard from '../Components/Dashboard';
import Filter from '../Components/Filter';
import TodoList from '../Components/TodoList';

const TodoDashboard = () => {

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!auth) {
          console.error("No auth token available");
          return;
        }

        const response = await axios.get("http://localhost:5164/api/ToDo", {
          headers: { 
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true // Add this line
        });
        console.log("hiiiii", response.data)
        setTasks(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Authentication failed - invalid or expired token");
          console.log("Full error response:", error.response);
        } else {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchTasks();
  }, [auth]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const addTask = async () => {
    if (!newTaskTitle.trim() || !newTaskDescription.trim()) {
      alert("Please enter both a title and a description.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5164/api/ToDo",
        { title: newTaskTitle, description: newTaskDescription },
        {
          headers: { 
            Authorization: `Bearer ${auth}`, 
            'Content-Type': 'application/json' 
          },
          withCredentials: true // Add this line to send cookies with the request
        }
      );
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Authentication failed - invalid or expired token");
        console.log("Full error response:", error.response);
      } else {
        console.error("Error adding task", error);
      }
    }
  };
  

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5164/api/ToDo/${id}`, {
        headers: { 
          Authorization: `Bearer ${auth}`, 
          'Content-Type': 'application/json' 
        },
        withCredentials: true // Ensures cookies (authentication) are sent
      });
  
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Authentication failed - invalid or expired token");
        console.log("Full error response:", error.response);
      } else {
        console.error("Error deleting task", error);
      }
    }
  };
  

  const handleEditTask = async (updatedTask) => {
  try {
    const taskUpdate = {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        isCompleted: updatedTask.isCompleted
        // Don't send userId unless you're specifically updating it
      };
    const response = await axios.put(
      `http://localhost:5164/api/ToDo/${updatedTask.id}`,
      updatedTask,
      {
        headers: { 
          Authorization: `Bearer ${auth}`, 
          'Content-Type': 'application/json' 
        },
        withCredentials: true // Ensures cookies (authentication) are sent
      }
    );

    // Update the tasks array with the new data from the response
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? response.data : t))
    );
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Authentication failed - invalid or expired token");
      console.log("Full error response:", error.response);
    } else {
      console.error("Error editing task:", error);
    }
  }
};


  return (
    <div className="todo-dashboard">
    <button onClick={logout}>Logout</button>
        <h1>Hello, Aqeel, Start planning today</h1>
        <div className="date-section">
            <h2>Sunday</h2>
            <p>04, April 2024</p>
        </div>

        <div className="add-task-section">
        <input
          type="text"
          className="task-input"
          placeholder="Type Title Of Task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          className="task-input"
          placeholder="Detail Of Your Task"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button className="add-task-btn" onClick={addTask}>+</button>
      </div>

        <Dashboard tasks={tasks} />
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <TodoList 
            tasks={tasks} 
            filter={filter}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
    />
    </div>
  );
};

export default TodoDashboard;
