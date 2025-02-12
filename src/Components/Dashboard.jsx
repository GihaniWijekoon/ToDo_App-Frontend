import React from "react";

const Dashboard = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md w-80">
      <h3 className="text-xl font-bold mb-2">Task Summary</h3>
      <p className="text-green-500">Completed: {completedTasks}</p>
      <p className="text-red-500">Pending: {pendingTasks}</p>
      <p className="text-blue-500">Total: {tasks.length}</p>
    </div>
  );
};

export default Dashboard;
