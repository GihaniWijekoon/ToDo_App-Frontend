import React from "react";
import TodoItem from "./TodoItem";
import "./TodoItem.css";

const TodoList = ({ tasks, filter, onDelete, onEdit, onChangeStatus }) => {
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "All":
        return true;
      case "Active":
        return task.isCompleted === false;
      case "Completed":
        return task.isCompleted === true;
      default:
        return false;
    }
  });

  return (
    <div className="todo-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangeStatus={onChangeStatus}
          />
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TodoList;
