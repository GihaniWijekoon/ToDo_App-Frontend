import React from "react";
import "./Filter.css";

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <button
        onClick={() => onFilterChange("All")}
        className={`filter-button ${filter === "All" ? "active" : ""}`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange("Active")}
        className={`filter-button ${filter === "Active" ? "active" : ""}`}
      >
        In Progress
      </button>
      <button
        onClick={() => onFilterChange("Completed")}
        className={`filter-button ${filter === "Completed" ? "active" : ""}`}
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
