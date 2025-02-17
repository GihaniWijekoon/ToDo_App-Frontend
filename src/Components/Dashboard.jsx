import React from "react";
import "../App.css";
import "./Dashboard.css";

const Dashboard = ({ tasks }) => {
  const completedTasks = tasks.filter(
    (task) => task.isCompleted === true
  ).length;
  const allTasks = tasks.filter((task) => task.status !== true).length;
  const pendingTasks = allTasks-completedTasks;

  return (
    <div >
      <div className="summary-box summary-box1">
        <h3>Total TASKS</h3>
        <p>{allTasks}</p>
      </div>
      <div className="dashboard-summary">
      <div className="summary-box summary-box2">
        <h3>COMPLETED</h3>
        <p>{completedTasks}</p>
      </div>
      <div className="summary-box summary-box3">
        <h3>PENDING TASKS</h3>
        <p>{pendingTasks}</p>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
