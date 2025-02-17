import React from "react";
import "../App.css";
import "./Dashboard.css";

const Dashboard = ({ tasks }) => {
  const completedTasks = tasks.filter(
    (task) => task.isCompleted === true
  ).length;
  const pendingTasks = tasks.filter((task) => task.status !== true).length;

  return (
    <div className="dashboard-summary">
      <div className="summary-box" role="status">
        <h3>COMPLETED TASKS</h3>
        <p>{completedTasks}</p>
      </div>
      <div className="summary-box" role="status">
        <h3>PENDING TASKS</h3>
        <p>{pendingTasks}</p>
      </div>
    </div>
  );
};

export default Dashboard;
