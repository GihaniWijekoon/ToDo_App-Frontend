import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Filter from "../Components/Filter";
import TodoList from "../Components/TodoList";
import Calendar from "../Components/Calendar";
import "./Tododashboard.css";
import Logo from "../assets/images/TodoLogo.png";
import { CirclePlus } from "lucide-react";

const TodoDashboard = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No auth token available");
          return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }
        console.log("Token being sent:", token);
        console.log("User ID being sent in URL:", userId);

        const response = await axios.get(
          `http://localhost:5164/api/ToDo/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("task", response.data);
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
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.post(
        `http://localhost:5164/api/ToDo/user/${userId}`,
        { title: newTaskTitle, description: newTaskDescription },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setTasks([...tasks, response.data]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setShowModal(false);
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
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5164/api/ToDo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
        isCompleted: updatedTask.isCompleted,
      };
      const response = await axios.put(
        `http://localhost:5164/api/ToDo/${updatedTask.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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

  const toggleTaskCompletion = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:5164/api/todo/toggle-completion/${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { ...task, isCompleted: !task.isCompleted }
              : task
          )
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      throw new Error("Failed to update task status");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="column column-1">
        <div className="app-logo">
          <img src={Logo} alt="Logo" width="100" />
        </div>
        <nav className="nav-menu">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item" onClick={logout}>
            Log Out
          </button>
        </nav>
      </div>

      <div className="column column-2">
        <div className="title">
          <h2>ToDoZen</h2>
        </div>
        <div className="add-task-section">
          <div>
            <button className="add-task-btn" onClick={() => setShowModal(true)}>
              <div className="add-task-btn-icon">
                <CirclePlus size={24} color="white" />
                Add Task
              </div>
            </button>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Add Task</h2>
                  <label>Task Title:</label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <label>Task Description:</label>
                  <textarea
                    placeholder="Enter task description"
                    rows="4"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                  <div className="button-group">
                    <button onClick={addTask}>Add Task</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <TodoList
          tasks={tasks}
          filter={filter}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onChangeStatus={toggleTaskCompletion}
        />
      </div>

      <div className="column column-3">
        <div className="calendar-section">
          <Calendar value={new Date()} />
        </div>
        <div className="summary-section">
          <Dashboard tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;
