import React, { useState, useRef, useEffect } from "react";
import "./TodoItem.css";
import { MoreVertical } from "lucide-react";

const TodoItem = ({ task, onDelete, onEdit, onChangeStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    onDelete(task.id);
    console.log("id======", task.id);
  };

  const handleSave = () => {
    const updatedTask = {
      id: task.id,
      title: taskTitle,
      description: taskDescription,
      isCompleted: task.isCompleted,
    };
    onEdit(updatedTask);
    setShowModal(false);
  };

  const handleToggleCompletion = async (taskId) => {
    try {
      await onChangeStatus(taskId);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  return (
    <>
      <div className="todo-item">
        <div className="more-options" ref={dropdownRef}>
          <button
            className="more-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreVertical size={20} />
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => {
                  setShowModal(true);
                  setShowDropdown(false);
                }}
              >
                Edit
              </button>
              <button
                className="dropdown-item delete"
                onClick={() => {
                  handleDelete(task.id);
                  setShowDropdown(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <p className="task-date">Start date: {task.createdAt.split("T")[0]}</p>

        <button
          className={`status-button ${
            task.isCompleted ? "completed" : "active"
          }`}
          onClick={() => handleToggleCompletion(task.id)}
        >
          {task.isCompleted ? "Mark as Active" : "Mark as Completed"}
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <label>Task Title:</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <label>Task Description:</label>
            <textarea
              placeholder="Enter task description"
              rows="4"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div className="button-group">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
