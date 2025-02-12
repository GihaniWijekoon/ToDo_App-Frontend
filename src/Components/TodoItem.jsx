// TodoItem.jsx
import React, { useState } from "react";

const TodoItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Toggle the task's completed status
  const handleToggle = () => {
    onToggleComplete(task.id);
  };

  // Delete the task
  const handleDelete = () => {
    onDelete(task.id);
  };

  // Start editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Save the edited text
  const handleSave = () => {
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  // Cancel editing and revert the text
  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-2 border border-gray-300 mb-2 rounded">
      <div className="flex items-center">
        {/* Checkbox for marking task as completed */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />
        ) : (
          <span className={task.completed ? "line-through" : ""}>
            {task.text}
          </span>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-1 rounded mr-1"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white p-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white p-1 rounded mr-1"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
