// TodoList.jsx
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <ul className="w-full">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
