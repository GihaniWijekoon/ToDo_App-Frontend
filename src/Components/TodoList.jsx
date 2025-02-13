import React from 'react';
import TodoItem from './TodoItem';
import '../App.css';

const TodoList = ({ tasks, filter, onDelete, onEdit}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return task.isCompleted !== 'true';
    if (filter === 'Completed') return task.isCompleted === 'true';
    return false;
  });

  return (
    <div className="todo-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TodoItem 
            key={task.id} 
            task={task} 
            onDelete={onDelete}
            onEdit={onEdit}
        />)
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TodoList;
