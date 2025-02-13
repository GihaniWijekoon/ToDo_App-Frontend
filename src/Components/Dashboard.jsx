import React from 'react';
import '../App.css';

const Dashboard = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const pendingTasks = tasks.filter((task) => task.status !== 'Completed').length;

  return (
    <div className="dashboard-summary">
      <div className="summary-box">
        <h3>COMPLETED TASKS</h3>
        <p>{completedTasks}</p>
      </div>
      <div className="summary-box">
        <h3>PENDING TASKS</h3>
        <p>{pendingTasks}</p>
      </div>
    </div>
  );
};

export default Dashboard;

