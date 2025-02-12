import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Components/Dashboard"

const TodoDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

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

  const addTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5164/api/ToDo",
        { text: newTask },
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5164/api/ToDo/${id}`, {
        headers: { Authorization: `Bearer ${auth}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Todo Dashboard</h2>
      <button onClick={logout} className="mb-4 bg-red-500 text-white p-2 rounded">Logout</button>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={tasks.id} className="flex justify-between w-80 p-2 border border-gray-300 mb-2 rounded">
            {tasks.title}
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoDashboard;
