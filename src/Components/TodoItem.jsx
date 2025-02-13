import React, { useState } from 'react';
import '../App.css';

const TodoItem = ({ task, onDelete, onEdit }) => {

    const [showModal, setShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDescription, setTaskDescription] = useState(task.description);

    // Called when the Delete button is clicked
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleSave = () => {
    const updatedTask = {
        id: task.id,
        title: taskTitle,
        description: taskDescription,
        isCompleted: task.isCompleted // maintain the current completion status
      };
    onEdit(updatedTask);  // Call the parent component's function to update the task
    setShowModal(false);  // Close the modal after saving
  };

  return (
    <div className="todo-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Start date: {task.createdAt.split('T')[0]}</p>
      <div className="todo-actions">
        <button className="complete-btn">
          {task.status === 'Completed' ? 'Mark as Active' : 'Mark as Completed'}
        </button>
        <button className="delete-btn" onClick={handleDelete} >Delete</button>
        
        <button className="edit-btn" onClick={() => setShowModal(true)}>Edit</button>

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
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default TodoItem;
